import React, { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

const EmailInput = (props) => {
  const [newEmail, setNewEmail] = useState("");
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setEmails([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((email) => {
          setEmails((oldArray) => [...oldArray, email]);
        });
      }
    });
  }, []);


  return (
    <>
      <label htmlFor="cs_select" className="form-label">
        E-mail cím
      </label>
      <input
        className="form-control mb-3"
        list="datalistOptions"
        id="cs_select"
        placeholder="Add meg a Coffee Specialist e-mail címét"
        value={newEmail}
        onChange={(e) => {setNewEmail(e.target.value);
        props.onEmailUpdate(e.target.value)}}
        pattern=".+@nespresso\.com"
        required
      />
      <datalist id="datalistOptions">
        {emails.map((email, i) => (
          <option key={i} value={email.email}></option>
        ))}
      </datalist>
    </>
  );
};


export default EmailInput;
