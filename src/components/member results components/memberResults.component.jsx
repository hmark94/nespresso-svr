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
  const { route, uuid } = useParams();

  const dataRef = ref(db, uuid);
  const surveyResponseRef = collection(fdb, "surveyResponse");

  const getName = () => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setMemberName(data.member);
    });
  };

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

        <div className="d-flex align-items-center justify-content-between">
          <div className="m-4">
            <h1>{memberName}</h1>
          </div>
        </div>
        <div></div>
      </section>

      {results.length > 0 ? (
        <div className="results-body d-flex flex-column-2">
          {results.map((result) => (
            <Link key={result.id} to={`/results/${route}/${uuid}/${result.id}`}>
              <Card className="card h-100 m-3" style={{ width: "25rem" }}>
                <Card.Header
                  className="card-header text-center"
                  style={{ background: "rgb(243 238 230)", fontWeight: "600" }}
                >
                  {result.email}
                </Card.Header>
                <Card.Body className="card-body d-flex flex-column justify-content-center">
                  <p className="mx-auto">Eredmény: 104/{result.total}</p>
                  <p className="mx-auto">{result.percentage}</p>
                  <p className="mx-auto">
                    Dátum: {result.date.toDate().toString().substring(0, 24)}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <h2>Nincsenek eredmények!</h2>
      )}
    </>
  );
}
