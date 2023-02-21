import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "./shared/Spinner";
import BackButton from "./shared/BackButton";
import SVR_APP_DATA from "../context/DataBaseContext";
import { fdb } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card } from "react-bootstrap";

function BtqPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { route } = useParams();
  const boutique = SVR_APP_DATA[0].items.find((item) => item.route === route);

  const resultsRef = collection(fdb, "surveyResponse");

  const getResults = async () => {
    const q = query(resultsRef, where("btq", "==", `${route}`));

    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    setResults(docs);
  };

  useEffect(() => {
    setIsLoading(true);
    getResults().finally(() => setIsLoading(false));
  }, [route]);



  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="form-header mb-3 mt-6">
        <BackButton />

        <div className="d-flex align-items-center justify-content-between">
          <div className="m-4">
            <h1>{boutique.boutique_name}</h1>
          </div>
        </div>
        <div></div>
      </section>

      <div className="results-body d-flex flex-column-2">{results.map((result) => (
          <Link key={result.id} to={`/results/${route}/${result.id}`}>
            <Card className='card h-100 m-3' style={{ width: '25rem' }}>
              <Card.Header
                className='card-header text-center'
                style={{ background: 'rgb(243 238 230)', fontWeight: '600' }}
              >
                {result.email}
              </Card.Header>
              <Card.Body className='card-body d-flex flex-column justify-content-center'>
                <p className="mx-auto">104/{result.total}</p>
                <p className="mx-auto">{result.percentage}</p>
                <p className="mx-auto">{result.date.toDate().toString()}</p>
              </Card.Body>
            </Card>
          </Link>
        ))}</div>
    </>
  );
}

export default BtqPage;
