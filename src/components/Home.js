import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import Logo from "../Logo/Nespresso-Logotype-Correct-2048x533-copy.png";
import CheckLogo from "../Icons/Nespresso-Icons-05.png";
import ResultsLogo from "../Icons/Nespresso-Icons-10.png";
import MembersLogo from "../Icons/Nespresso-Icons-11.png";
import '../css/home.css'

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
    <>
      <Navbar bg="light" fixed="top">
        <Container>
          <Navbar.Brand href="/home">
            <img
              src={Logo}
              width="160"
              height="30"
              className="d-inline-block align-top"
              alt="Nespresso logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style={{ paddingRight: "8px" }}>
              Bejelentkezve mint: <a>{user && user.email}</a>
            </Navbar.Text>
            <Button variant="danger" onClick={handleLogOut}>
              Kijelentkezés
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="col">
            <a href="/new-form">
              <div className="card shadow-sm">
                <img src={CheckLogo} />
                <p className="card-text">Új mérés</p>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="/results">
              <div className="card shadow-sm">
                <img src={ResultsLogo} />
                <p className="card-text">Eredmények</p>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="/members">
              <div className="card shadow-sm">
                <img src={MembersLogo} />
                <p className="card-text">Coffee Specialistek</p>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
