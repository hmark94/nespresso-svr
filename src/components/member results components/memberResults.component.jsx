import { doc } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import ResultDataService from "../../context/ResultContext";
import { Button, Card } from "react-bootstrap";
import Chart from "chart.js/auto";

import "./memberResults.styles.css";

export default function MemberResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const data = await ResultDataService.getAllResults();
    /* console.log(data.docs); */
    setResults(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  return (
    <>
      <div className="results-body">
        <div className="mb-4">
          <a href="#">
            <Card>
              <Card.Header
                style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
              >
                {JSON.stringify(results, undefined, 2)}
              </Card.Header>
              <Card.Body>Body</Card.Body>
            </Card>
          </a>
        </div>
      </div>
      <div>{JSON.stringify(results, undefined, 2)}</div>
      <div>Név:</div>
    </>
  );
}
