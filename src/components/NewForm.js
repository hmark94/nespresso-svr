import React, { useState, useEffect } from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

export default function NewForm() {
  const [emails, setEmails] = useState([]);
  const [value, setValue] = useState("");

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

  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
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
          <h2>Short Visit Report</h2>
        </div>
        <div></div>
      </section>

      <div className="newForm-body">
        <Form>
          <label htmlFor="exampleDataList" className="form-label">
            E-mail cím
          </label>
          <input
            className="form-control mb-3"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Add meg a Coffee Specialist e-mail címét"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <datalist id="datalistOptions">
            {emails.map((email, i) => (
              <option key={i} value={email.email}></option>
            ))}
          </datalist>

          <Form.Select aria-label="Default select example" className="mb-3">
            <option value="0" selected="selected" disabled>
              Válaszd ki az üzletet!
            </option>
            <option value="1">Allee Boutique</option>
            <option value="2">Andrássy Boutique</option>
            <option value="3">Árkád Budapest Boutique</option>
            <option value="4">Árkád Győr Boutique</option>
            <option value="5" disabled>
              Etele Pláza Boutique
            </option>
            <option value="6">Mammut Boutique</option>
            <option value="7">Mom Boutique</option>
            <option value="8">Westend Boutique</option>
          </Form.Select>

          <h2>I. Megjelenés</h2>
          <Form.Check
            label="A Coffee Specialist megjelenése kifogástalan"
            type="checkbox"
            id="default-checkbox-1"
          />
          <Form.Check
            label="A pult tiszta és rendezett"
            type="checkbox"
            id="default-checkbox-2"
          />

          <h2>II. Kapcsolatteremtés</h2>

          <Form.Label htmlFor="inputQuestion1">
            Barátságos hangnemben, személyes mondattal, kérdéssel üdvözölte a
            vásárlót a Coffee Specialist? (Ice-breaking)
          </Form.Label>
          <Form.Select aria-label="Default select example" className="mb-3">
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion1">
            Érdeklődött-e a Nespresso & You tagságról, megkereste-e a
            klubtagságot?
          </Form.Label>
          <Form.Select aria-label="Default select example" className="mb-3">
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion1">
            Említette-e a Nespresso & You tagsági szintet/Lehetséges szintet?
          </Form.Label>
          <Form.Select aria-label="Default select example" className="mb-3">
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <h2>III. Igényfelmérés</h2>

          <Button variant="success" type="submit">
            Küldés
          </Button>
        </Form>
      </div>
    </>
  );
}
