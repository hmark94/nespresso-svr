import React from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function NewForm() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <>
      <NavbarComponent />
      <div className="form-container">
        <div className="form-header">
          <div className="back-button">
            <Button variant="warning" onClick={handleClick}>
              Vissza
            </Button>
          </div>
          <div className="form-title">
            <h2>Short Visit Report</h2>
          </div>
        </div>
      </div>
    </>
  );
}
