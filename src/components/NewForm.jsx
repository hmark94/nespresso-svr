import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { db, fdb } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import NewFormDatabase from "./NewFormDatabase";
import BackButton from "./shared/BackButton";
import EmailInput from "./EmailInput";
import BtqSelect from "./BtqSelect";
import SubmitButton from "./shared/SubmitButton";
import { sum, percentage } from './shared/Calculations';

export default function NewForm() {
  const [newEmail, setNewEmail] = useState("");
  const [newBtq, setNewBtq] = useState("");
  const [answers, setAnswers] = useState({});
  const { user } = useUserAuth();

  let navigate = useNavigate();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const surveyResponseRef = collection(fdb, "surveyResponse");

  const saveAnswers = async (e) => {
    e.preventDefault();

    await addDoc(surveyResponseRef, {
      email: newEmail,
      btq: newBtq,
      answers: answers,
      evaluator: user.email,
      date: date,
      /*       total: sum,
      percentage: `${Math.trunc((sum / 174) * 100)}%`, */
    })
      .then(() => {
        navigate("/success");
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  return (
    <>
      <section className="form-header mb-3 mt-6">
        <BackButton />

        <div className="d-flex align-items-center justify-content-between">
          <h1>Short Visit Report</h1>
        </div>
        <div></div>
      </section>

      <section className="form-body d-flex align-items-center">
        <Form onSubmit={saveAnswers}>
          <EmailInput onEmailUpdate={setNewEmail} />

          <BtqSelect onBtqSelect={setNewBtq} />

          <NewFormDatabase onAnswerUpdate={setAnswers} />

          <Form.Label className="mt-3 fw-bolder">Kitöltő:</Form.Label>
          <span className="ms-2">{user && user.email}</span>

          <div className="mt-3 mb-3 d-grid">
            <SubmitButton />
          </div>
        </Form>
        <div className="form-footer">
          *küldés előtt, győződj meg róla, hogy mindent helyesen töltöttél ki
        </div>
      </section>
    </>
  );
}
