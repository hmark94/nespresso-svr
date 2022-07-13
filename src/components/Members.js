import React, { useEffect, useState } from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../css/members.css";
import { db } from "../firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";

export default function Members() {
  const [member, setMember] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleMemberChange = (e) => {
    setMember(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }

  //read
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

  //write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      member,
      email,
      uuid,
    });

    setMember("");
    setEmail("");
  };

  //update
  const handleUpdate = (email) => {
    setIsEdit(true);
    setTempUuid(email.uuid);
    setEmail(email.email);
    setMember(email.member);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      member,
      email,
      uuid: tempUuid,
    });

    setMember("");
    setEmail("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (email) => {
    remove(ref(db, `/${email.uuid}`));
  };

  return (
    <>
      <NavbarComponent />
      <section className="form-header">
        <div className="back-button">
          <Button variant="warning" onClick={handleClick}>
            Vissza
          </Button>
        </div>

        <div className="form-title">
          <h2>Coffee Specialists</h2>
        </div>

        <div></div>
      </section>
      <section className="form-body">
        <div className="members-box">
          <div className="searchbar">
            <input type="text" placeholder="Coffee Specialist..." />
            <button type="submit">Keresés</button>
          </div>
          <div className="members-email" style={{ "overflow-y": "auto"}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email, i) => (
                  <tr key={i}>
                    <td>{email.email}</td>
                    <td>
                      <Button size="sm" onClick={() => handleUpdate(email)}>
                        Módosít
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(email)}
                      >
                        Töröl
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="members-add">
          <input
            type="text"
            value={member}
            onChange={handleMemberChange}
            placeholder="Coffee Specialist neve"
          ></input>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Coffee Specialist email címe"
          ></input>
          {isEdit ? (
            <>
              <button type="submit" onClick={handleSubmitChange}>
                Módosít
              </button>
              <button
                type="submit"
                onClick={() => {
                  setIsEdit(false);
                  setEmail("");
                  setMember("");
                }}
              >
                Mégse
              </button>
            </>
          ) : (
            <button type="submit" onClick={writeToDatabase}>
              Hozzáad
            </button>
          )}
        </div>
      </section>
    </>
  );
}
