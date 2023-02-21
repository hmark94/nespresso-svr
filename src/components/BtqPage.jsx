import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./shared/Spinner";
import BackButton from "./shared/BackButton";
import SVR_APP_DATA from "../context/DataBaseContext";
import { fdb } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function BtqPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { route } = useParams();
  const boutique = SVR_APP_DATA[0].items.find((item) => item.route === route);

  const resultsRef = collection(fdb, "surveyResponse");

  const getResults = async () => {

    const q = query(resultsRef, where("btq", "==", `${route}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });

  };

  useEffect(() => {
    getResults();
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

      <div className="results-body">Eredmények</div>
    </>
  );
}

export default BtqPage;
