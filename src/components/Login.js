import React, { useState, useRef } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Logo from "../Logo/Nespresso-Logotype-Correct-2048x533.png";
import Spinner from "./shared/Spinner";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch {
      setError("A belépés nem sikerült!");
    }
    setIsLoading(false);
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div
        className="modal-content rounded-4 shadow"
        style={{ marginTop: "30%" }}
      >
        <div className="p-4 box">
          <img className="mb-3" src={Logo} height={80} width={430} />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="form-floating mb-3"
              controlId="formBasicEmail"
            >
              <Form.Control
                className="form-control-lg"
                type="email"
                placeholder="Email cím"
                pattern=".+@nespresso\.com"
                ref={emailRef}
                required
              />
              <label htmlFor="floatingInput">Email cím</label>
            </Form.Group>

            <Form.Group
              className="form-floating mb-3"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="password"
                placeholder="Jelszó"
                ref={passwordRef}
                required
              />
              <label htmlFor="floatingInput">Jelszó</label>
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
}
