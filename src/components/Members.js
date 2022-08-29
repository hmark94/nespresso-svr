import React, { useEffect, useState } from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
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
  const [searchTerm, setSearchTerm] = useState("");

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
            <Form.Control
              type="text"
              placeholder="Coffee Specialist..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="members-email">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {emails
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (val.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return val;
                    }
                  })
                  .map((email, i) => (
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
          <Form.Control
            type="text"
            value={member}
            onChange={handleMemberChange}
            placeholder="Coffee Specialist neve"
          ></Form.Control>
          <Form.Control
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Coffee Specialist email címe"
          ></Form.Control>
          {isEdit ? (
            <>
              <Button type="submit" onClick={handleSubmitChange}>
                Módosít
              </Button>
              <Button
                variant="danger"
                type="submit"
                onClick={() => {
                  setIsEdit(false);
                  setEmail("");
                  setMember("");
                }}
              >
                Mégse
              </Button>
            </>
          ) : (
            <Button variant="success" type="submit" onClick={writeToDatabase}>
              Hozzáad
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
