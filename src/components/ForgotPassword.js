import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setMessage("");
      setError("");
      await resetPassword(email);
      setMessage("Ellenőrizd az email fiókodat!");
    } catch (error) {
      setError("A jelszó visszaállítása nem sikerült!");
    }
  };

  return (
    <>
      <div className="modal-content rounded-4 shadow">
        <div className="p-4 box">
          <h2 className="mb-3">Jelszó visszaállítása</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email cím"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Visszaállítás
              </Button>
            </div>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/">Vissza a főoldalra</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
