import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Logo from "../Logo/Nespresso-Logotype-Correct-2048x533.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="modal-content rounded-4 shadow">
        <div className="p-4 box">
          <img className="mb-3" src={Logo} height={80} width={400} />
          {/* <h2 className="mb-3">Nespresso SVR</h2> */}
          {error && <Alert variant="danger">{error}</Alert>}
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
                Bejelentkezés
              </Button>
            </div>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/forgot-password">Jelszó visszaállítása</Link>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Nincs felhasználói fiókod? <Link to="/signup">Regisztráció</Link>
      </div>
    </>
  );
};

export default Login;
