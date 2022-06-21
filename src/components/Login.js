import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <div className="modal-content rounded-4 shadow">
        <div className="p-4 box">
          <h2 className="mb-3">Nespresso SVR</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Bejelentkezés
              </Button>
            </div>
          </Form>
          <hr />
        </div>
        <div className="p-4 box mt-3 text-center">Don't have an account?</div>
      </div>
    </>
  );
};

export default Login;
