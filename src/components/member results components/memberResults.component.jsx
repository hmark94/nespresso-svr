import { doc } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import ResultDataService from "../../context/ResultContext";

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
      <div>{JSON.stringify(results, undefined, 2)}</div>
      <div>Név:</div>
    </>
  );
}
