import React from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import AlleeResultsComponents from "./results components/AlleeResultsComponents";
import AndrassyResultsComponents from "./results components/AndrassyResultsComponents";
import ArkadBudapestResultsComponents from "./results components/ArkadBudapestResultsComponents";
import ArkadGyorResultsComponents from "./results components/ArkadGyorResultsComponents";
import MammutResultsComponents from "./results components/MammutResultsComponents";
import MomResultsComponents from "./results components/MomResultsComponents";
import WestendResultsComponents from "./results components/WestendResultsComponents";
import Chart from 'chart.js/auto';
import SVR_APP_DATA from '../context/DataBaseContext'

export default function Results() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }

  return (
    <>
      <NavbarComponent />
      <section className="form-header mb-3 mt-3">
        <div className="back-button">
          <Button variant="warning" onClick={handleClick}>
            Vissza
          </Button>
        </div>

        <div className="results-title">
          <h2>Eredmények</h2>
        </div>
      </section>

      <div className="results-top mb-4">
        Havi átlag:<br />
        Éves átlag:
      </div>

      <div className="results-body">
        {SVR_APP_DATA.map((e, i) => (<div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                {console.log()}
              </Card.Header>
              <Card.Body>
                Eredmény
              </Card.Body>
            </Card>
          </a>
        </div>))}
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Allee Boutique
              </Card.Header>
              <Card.Body>
                <AlleeResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Andrássy Boutique
              </Card.Header>
              <Card.Body>
                <AndrassyResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Árkád Budapest Boutique
              </Card.Header>
              <Card.Body>
                <ArkadBudapestResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Árkád Győr Boutique
              </Card.Header>
              <Card.Body>
                <ArkadGyorResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Mammut Boutique
              </Card.Header>
              <Card.Body>
                <MammutResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Mom Boutique
              </Card.Header>
              <Card.Body>
                <MomResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                Westend Boutique
              </Card.Header>
              <Card.Body>
                <WestendResultsComponents />
              </Card.Body>
            </Card>
          </a>
        </div>
      </div>
    </>
  );
}
