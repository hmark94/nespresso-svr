import React, { useState, useEffect } from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { onValue, ref } from "firebase/database";
import { db, fdb } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

export default function NewForm() {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newBtq, setNewBtq] = useState("");
  const [newQuestion1, setNewQuestion1] = useState("");
  const [newQuestion2, setNewQuestion2] = useState("");
  const [newQuestion3, setNewQuestion3] = useState("");
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { user, logOut } = useUserAuth();

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


  const surveyResponseRef = collection(fdb, "surveyResponse");

  const saveAnswers = async (e) => {
    e.preventDefault();

    await addDoc(surveyResponseRef, {
      email: newEmail,
      btq: newBtq,
      question1: newQuestion1,
      question2: newQuestion2,
      question3: newQuestion3,
    })
      .then(() => {
        alert("SVR elküldve!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <>
      <NavbarComponent />
      <section className="form-header mb-3 mt-3">
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
        <Form onSubmit={saveAnswers}>
          <label htmlFor="cs_select" className="form-label">
            E-mail cím
          </label>
          <input
            className="form-control mb-3"
            list="datalistOptions"
            id="cs_select"
            placeholder="Add meg a Coffee Specialist e-mail címét"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            pattern=".+@nespresso\.com"
            required
          />
          <datalist id="datalistOptions">
            {emails.map((email, i) => (
              <option key={i} value={email.email}></option>
            ))}
          </datalist>

          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="btq_select"
            value={newBtq}
            onChange={(e) => setNewBtq(e.target.value)}
            required
          >
            <option value={"default"} disabled>
              Válaszd ki az üzletet!
            </option>
            <option value="allee">Allee Boutique</option>
            <option value="andrassy">Andrássy Boutique</option>
            <option value="arkad">Árkád Budapest Boutique</option>
            <option value="gyor">Árkád Győr Boutique</option>
            <option value="etele" disabled>
              Etele Pláza Boutique
            </option>
            <option value="mammut">Mammut Boutique</option>
            <option value="mom">Mom Boutique</option>
            <option value="westend">Westend Boutique</option>
          </Form.Select>

          <h2 className="mb-3">I. Kapcsolatteremtés</h2>

          <Form.Label htmlFor="inputQuestion1" className="mt-3">
            Barátságosan üdvözölte a vásárlót a Coffee Specialist?
            (Ice-breaking)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion1"
            value={newQuestion1}
            onChange={(e) => setNewQuestion1(e.target.value)}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion2" className="mt-3">
            Megkereste-e a Nespresso & You tagságot?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion2"
            value={newQuestion2}
            onChange={(e) => {setNewQuestion2(e.target.value);
            if(e.target.value == 10) {
              setIsDisabled(true)
            } else {
              setIsDisabled(false)
            }}}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion3" className="mt-3">
            Ha nem volt klubtagsága a vásárlónak, mivel érvelt a regisztráció
            mellett?
          </Form.Label>
          <Form.Control
            as="textarea"
            id="inputQuestion3"
            rows={1}
            className="mb-3"
            disabled={isDisabled}
            value={newQuestion3}
            onChange={(e) => {setNewQuestion3(e.target.value)}}
          />
          {/* disabled ha az input question2 igen, enabled ha az input question2 nem */}

          <h2 className="mb-3">II. Igényfelmérés</h2>

          <Form.Label htmlFor="checkboxQuestion" className="mt-3">
            Mely kávérendszereket említette a Coffee Specialist?
          </Form.Label>
          <div className="mb-3">
            <Form.Check
              inline
              label="Vertuo"
              type="checkbox"
              value="5"
              name="group1"
              id="checkbox-1"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              inline
              label="Original"
              type="checkbox"
              value="5"
              name="group1"
              id="checkbox-2"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              inline
              label="Egyik sem"
              type="checkbox"
              value="0"
              name="group1"
              id="checkbox-3"
              style={{ fontSize: "1.3rem" }}
            />
          </div>

          <Form.Label htmlFor="inputQuestion4" className="mt-3">
            Használta a Nessoft nyújtotta információkat?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion4"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion5" className="mt-3">
            Korábbi vásárlásból vagy átlagos fogyasztásból mit használt fel?
          </Form.Label>
          <Form.Control
            as="textarea"
            id="inputQuestion5"
            rows={1}
            className="mb-3"
          />
          {/* enabled ha az input question6 igen, disabled ha az input question6 nem */}

          <Form.Label htmlFor="inputQuestion6" className="mt-3">
            Érdeklődött a vásárló kávéfogyasztási szokásai iránt?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion6"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion7" className="mt-3">
            Felajánlotta a kóstolás lehetőségét?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion7"
          >
            <option value="0">Nem</option>
            <option value="10">Igen, a vásárlás elején/közben</option>
            <option value="5">Igen, a vásárlás végén</option>
          </Form.Select>

          <h2 className="mb-3">III. Kapcsolat a márka és a vásárló között</h2>

          <Form.Label htmlFor="inputQuestion8" className="mt-3">
            A Coffee Specialist mesélt személyes történetet egy termékről vagy a
            márkáról?
          </Form.Label>
          <Form.Select aria-label="Default select example" id="inputQuestion8">
            <option value="0">Nem</option>
            <option value="15">Igen</option>
          </Form.Select>
          <div>
            <Form.Text id="inputQuestion8">
              A történetmesélés olyan anekdóták vagy történetek megosztására
              vonatkozik, melyek túlmennek a termék egyszerű leírásán.
            </Form.Text>
          </div>

          <Form.Label htmlFor="inputQuestion9" className="mt-3">
            Milyen történetet mesélt?
          </Form.Label>
          <Form.Control
            as="textarea"
            id="inputQuestion9"
            rows={1}
            className="mb-3"
          />
          {/* enabled ha az input question6 igen, disabled ha az input question6 nem */}

          <Form.Label htmlFor="inputQuestion10" className="mt-3">
            A beszélgetést követően, releváns termékajánlás történt a
            vásárlónak?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion10"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion11" className="mt-3">
            A vásárlás során a Coffee Specialist említette a Nespresso & You
            vagy Bónuszprogram előnyeit?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion11"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
            <option value="5">Csak a vásárló kérdésére reagálva</option>
          </Form.Select>

          <Form.Label htmlFor="checkboxQuestion2" className="mt-3">
            Az alábbi szolgáltatások közül melyeket említette a Coffee
            Specialist, hogy ösztönözze, vagy megkönnyítse a jövőben a
            kávévásárlást?
          </Form.Label>
          <div className="mb-3">
            <Form.Check
              label="Bónuszprogram"
              type="checkbox"
              value="5"
              name="group2"
              id="checkbox-gr2-1"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Átvétel az üzletben"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-gr2-2"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Házhozszállítás"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-gr2-3"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso mobil app"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-gr2-4"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso weboldal"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-gr2-5"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso ügyfélszolgálat"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-gr2-6"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso and You"
              type="checkbox"
              value="5"
              name="group2"
              id="checkbox-gr2-7"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nem említett szolgáltatásokat"
              type="checkbox"
              value="0"
              name="group2"
              id="checkbox-gr2-8"
              style={{ fontSize: "1.3rem" }}
            />
          </div>

          <h2 className="mb-3">IV. Lezárás és elköszönés</h2>

          <Form.Label htmlFor="inputQuestion12" className="mt-3">
            A Coffee Specialist felhívta a figyelmet az újrahasznosítási
            szolgáltatásra és felajánlotta az ingyenes gyűjtőtasakot?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion12"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion13" className="mt-3">
            Udvariasan, újabb látogatásra invitálta a vásárlót. Jó egészséget
            kívánt neki. (vagy kávékóstolásra invitálja-e a Coffee Specialist a
            vásárlót?)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion13"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion14" className="mt-3">
            Kért-e visszajelzést az aktuális vásárlási élményről?
          </Form.Label>
          <Form.Select aria-label="Default select example" id="inputQuestion14">
            <option value="0">Nem</option>
            <option value="0">Igen</option>
          </Form.Select>
          <Form.Text id="inputQuestion14">
            Például: "Bízom benne, hogy megtaláltuk a kedvencét...", "Bízom
            benne, hogy jól érzete magát nálunk...", "Sikerült minden kérdésére
            megtalálni a választ...", "Örülök, hogy nálunk vásárolt, remélem
            hamarosan viszontlátjuk...", "Örülök, hogy hozzánk fordult a
            problémával..."
          </Form.Text>

          <Form.Label htmlFor="inputQuestion15" className="mt-3">
            Felhívta a figyelmet a lehetséges vásárlói kérdőívre, egyéb
            visszajelzési lehetőségekre?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion15"
          >
            <option value="0">Nem</option>
            <option value="0">Igen</option>
          </Form.Select>

          <h2 className="mb-3">
            V. Coffee Specialist viselkedése, személyes vélemény
          </h2>

          <Form.Label htmlFor="inputQuestion16" className="mt-3">
            Az értékesítés során a Coffee Specialist aktív és érdeklődő volt?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion16"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion17" className="mt-3">
            Akítv hallgatás és empátia jellemezte a beszélgetést? (igények
            újrafogalmazása, megerősítés, ösztönző kérdések, szemkontaktus)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion17"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion18" className="mt-3">
            A beszélgetés légköre barátságos volt, a Coffee Specialist
            mosolygott?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion18"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion19" className="mt-3">
            Megpróbált-e személyes kapcsolatot kialakítani?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion19"
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion20" className="mt-3">
            Milyennek érezted a vásárlást? Egyéb visszajelzés?
          </Form.Label>
          <Form.Control as="textarea" id="inputQuestion20" rows={3} />

          <Form.Label className="mt-3">
            Kitöltő: {user && user.email}
          </Form.Label>

          <div className="mt-3 mb-3 d-grid">
            <Button variant="success" type="submit" size="lg">
              Küldés
            </Button>
          </div>
        </Form>
        <div className="form-footer">
          *küldés előtt, győződj meg róla, hogy mindent helyesen töltöttél ki
        </div>
      </div>
    </>
  );
}
