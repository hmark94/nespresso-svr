import React from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CheckIcon from "../Icons/checked_list.png";

export default function Success() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  function handleClick2() {
    navigate("/new-form");
  }
  function handleClick3() {
    navigate("/results");
  }
  return (
    <>
      <NavbarComponent />
      <section className="form-header success-buttons">
        <div className="back-button">
          <Button variant="warning" onClick={handleClick} className="btn-lg">
            Főoldal
          </Button>
        </div>
        <div className="new-button">
          <Button variant="success" onClick={handleClick2} className="btn-lg">
            Új SVR
          </Button>
        </div>
        <div className="result-button">
          <Button variant="info" onClick={handleClick3} className="btn-lg">
            Eredmény megtekintése
          </Button>
        </div>
      </section>

      <div className="success-body">
        <div className="check-box">
          <img
            src={CheckIcon}
            className="check-icon"
            width="500px"
            height="500px"
            style={{
              filter:
                "invert(48%) sepia(62%) saturate(5428%) hue-rotate(75deg) brightness(97%) contrast(83%)",
            }}
          />
        </div>
        <div className="check-feedback">
          <span>Sikeres SVR kitöltés!</span>
        </div>
      </div>
    </>
  );
}
