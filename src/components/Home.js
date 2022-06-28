import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import Logo from "../Logo/Nespresso-Logotype-Correct-2048x533.png"

export default function Home() {
  const [error, setError] = useState("");
  const { user, logOut } = useUserAuth();
  

  async function handleLogOut() {
    setError("");

    try {
      await logOut();
      Navigate("/");
    } catch {
      setError("Kijelentkezés sikertelen!");
    }
  }

  return (
    <Navbar bg="light" fixed="top">
      <Container>
      <Navbar.Brand href="/home">
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Nespresso logo"
            />
          </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Bejelentkezve mint: <a>{user && user.email}</a>
          </Navbar.Text>
          <Button variant="danger" onClick={handleLogOut}>
            Kijelentkezés
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
