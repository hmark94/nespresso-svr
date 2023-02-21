import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "./memberResults.styles.css";
import BackButton from "../shared/BackButton";
import { useParams } from "react-router-dom";
import { db, fdb } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onValue, ref } from "firebase/database";

export default function MemberResults() {
  const [isLoading, setIsLoading] = useState(false);
  const [memberName, setMemberName] = useState("");
  const { uuid } = useParams();


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

    const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
      })
  };

  useEffect(() => {
    getResults();
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
    </>
  );
}
