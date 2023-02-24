import BackButton from "./shared/BackButton";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QUESTION_DATABASE from "../context/QuestionDataBaseContext";
import { fdb } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Spinner from "./shared/Spinner";

function SurveyResultPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const questionsData = QUESTION_DATABASE.questions;

  const surveyResponseRef = collection(fdb, "surveyResponse");

  const getAnswers = async () => {
    const q = query(surveyResponseRef, where("id", "==", `${id}`));

    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    setAnswers(docs);
  };

  useEffect(() => {
    setIsLoading(true);
    setQuestions(questionsData);
    getAnswers().finally(() => setIsLoading(false));

    console.log(questions)
  }, [id]);

  return (
    <>
      <section className="form-header mb-3 mt-6">
        <BackButton />

        <div className="d-flex align-items-center justify-content-between">
          <div className="m-4">
            <h1>{id}</h1>
          </div>
        </div>
      </section>

      <section>
        
      </section>
    </>
  );
}

export default SurveyResultPage;
