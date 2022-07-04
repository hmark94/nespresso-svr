import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button, NavbarBrand, Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import Logo from "../Logo/Nespresso-Logotype-Correct-2048x533-copy.png";
import CheckLogo from "../Icons/Nespresso-Icons-05.png";
import ResultsLogo from "../Icons/Nespresso-Icons-10.png";
import MembersLogo from "../Icons/Nespresso-Icons-11.png";
import "../css/home.css";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "./navbar/NavbarComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <main className="main-body">
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <a href="/new-form">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Új mérés</h4>
                </div>
                <div className="card-body">
                  <img src={CheckLogo} width="100%" />
                </div>
              </a>
            </div>
          </div>

          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <a href="/results">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Eredmények</h4>
                </div>
                <div className="card-body">
                  <img src={ResultsLogo} width="100%" />
                </div>
              </a>
            </div>
          </div>

          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <a href="/members">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Coffee Specialistek</h4>
                </div>
                <div className="card-body">
                  <img src={MembersLogo} width="100%" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
