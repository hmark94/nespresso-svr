import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
