import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="modal-content rounded-4 shadow">
        <div className="p-4 box">
          <h2 className="mb-3">Fiók létrehozása</h2>
          {error && <Alert variant="danger">{error}</Alert> }
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email cím"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Jelszó"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Regisztráció
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Van már fiókod? <Link to="/">Lépj be!</Link>{" "}
      </div>
    </>
  );
}
