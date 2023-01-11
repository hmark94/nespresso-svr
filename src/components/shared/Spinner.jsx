import React from "react";
import spinner from "../assets/spinner.gif";

function Spinner() {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{
        width: "100px",
        margin: "auto",
        marginTop: "100px",
        display: "block",
      }}
    />
  );
}

export default Spinner;
