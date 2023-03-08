import { useState, useEffect } from "react";
import Spinner from "../shared/Spinner";
import { Card } from "react-bootstrap";
import "./memberResults.styles.css";
import BackButton from "../shared/BackButton";
import { useParams, Link } from "react-router-dom";
import { db, fdb } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onValue, ref } from "firebase/database";

export default function MemberResults() {
  const [isLoading, setIsLoading] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [results, setResults] = useState([]);
  const [average, setAverage] = useState(null);
  const { route, uuid } = useParams();

  const dataRef = ref(db, uuid);
  const surveyResponseRef = collection(fdb, "surveyResponse");

  //Name of the member
  const getName = () => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setMemberName(data.member);
    });
  };

  //Get the results function
  const getResults = async () => {
    const q = query(surveyResponseRef, where("uuid", "==", `${uuid}`));

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
  }, [uuid]);

  useEffect(() => {
    getName();
    
  }, [memberName]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="form-header mb-3 mt-6">
        <BackButton />

        <div className="form-title mx-auto">
          <div className="m-4">
            <h1>{memberName}</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="results-top mb-4 mt-4">
          <h4>
            Havi átlag: <strong>{}</strong>
          </h4>
          <br />
          <h4>
            Éves átlag: <strong>{}</strong>
          </h4>
        </div>
      </section>

      {results.length > 0 ? (
        <div
          className={`results-body row ${
            results.length === 1 ? "row-cols-1" : "row-cols-md-2 row-cols-lg-2"
          }`}
        >
          {results.map((result) => (
            <div key={result.id} className="col mb-4">
              <Link
                key={result.id}
                to={`/results/${route}/${uuid}/${result.id}`}
              >
                <Card className="card h-100 m-3">
                  <Card.Header
                    className="card-header text-center"
                    style={{
                      background: "rgb(243 238 230)",
                      fontWeight: "600",
                    }}
                  >
                    {result.email}
                  </Card.Header>
                  <Card.Body className="card-body d-flex flex-column justify-content-center">
                    <p className="mx-auto">
                      <strong>Dátum:</strong>{" "}
                      {result.date.toDate().toString().substring(0, 24)}
                    </p>
                    <p className="mx-auto">
                      <strong>Eredmény: </strong>104/{result.total}
                    </p>
                    <p className="mx-auto percentage_text">
                      {result.percentage}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h2>Nincsenek eredmények!</h2>
      )}
    </>
  );
}
