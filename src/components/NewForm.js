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
  const [newQuestion1, setNewQuestion1] = useState(0);
  const [newQuestion2, setNewQuestion2] = useState(0);
  const [newQuestion3, setNewQuestion3] = useState("");
  const [newQuestion4, setNewQuestion4] = useState(0);
  const [newQuestion5, setNewQuestion5] = useState(0);
  const [newQuestion6, setNewQuestion6] = useState("");
  const [newQuestion7, setNewQuestion7] = useState(0);
  const [newQuestion8, setNewQuestion8] = useState(0);
  const [newQuestion9, setNewQuestion9] = useState(0);
  const [newQuestion10, setNewQuestion10] = useState("");
  const [newQuestion11, setNewQuestion11] = useState(0);
  const [newQuestion12, setNewQuestion12] = useState(0);
  const [newQuestion13, setNewQuestion13] = useState(0);
  const [newQuestion14, setNewQuestion14] = useState(0);
  const [newQuestion15, setNewQuestion15] = useState(0);
  const [newQuestion16, setNewQuestion16] = useState(0);
  const [newQuestion17, setNewQuestion17] = useState(0);
  const [newQuestion18, setNewQuestion18] = useState(0);
  const [newQuestion19, setNewQuestion19] = useState(0);
  const [newQuestion20, setNewQuestion20] = useState(0);
  const [newQuestion21, setNewQuestion21] = useState("");
  const [hasValue, setHasValue] = useState(0);
  const [hasValue2, setHasValue2] = useState(0);
  const [hasValue3, setHasValue3] = useState(0);
  const [hasValue4, setHasValue4] = useState(0);
  const [hasValue5, setHasValue5] = useState(0);
  const [hasValue6, setHasValue6] = useState(0);
  const [hasValue7, setHasValue7] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(true);
  const [isDisabled3, setIsDisabled3] = useState(true);
  const { user, logOut } = useUserAuth();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const sum =
    +newQuestion1 +
    +newQuestion2 +
    +newQuestion4 +
    +newQuestion5 +
    +newQuestion7 +
    +newQuestion8 +
    +newQuestion9 +
    +newQuestion11 +
    +newQuestion12 +
    +newQuestion13 +
    +newQuestion14 +
    +newQuestion15 +
    +newQuestion16 +
    +newQuestion17 +
    +newQuestion18 +
    +newQuestion19 +
    +newQuestion20 +
    +hasValue +
    +hasValue2 +
    +hasValue3 +
    +hasValue4 +
    +hasValue5 +
    +hasValue6 +
    +hasValue7;

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
      question01: newQuestion1,
      question02: newQuestion2,
      question03: newQuestion3,
      question04: newQuestion4,
      question05: newQuestion5,
      question06: newQuestion6,
      question07: newQuestion7,
      question08: newQuestion8,
      question09: newQuestion9,
      question10: newQuestion10,
      question11: newQuestion11,
      question12: newQuestion12,
      questionCheckbox: hasValue,
      questionCheckbox2: hasValue2,
      questionCheckbox3: hasValue3,
      questionCheckbox4: hasValue4,
      questionCheckbox5: hasValue5,
      questionCheckbox6: hasValue6,
      questionCheckbox7: hasValue7,
      question13: newQuestion13,
      question14: newQuestion14,
      question15: newQuestion15,
      question16: newQuestion16,
      question17: newQuestion17,
      question18: newQuestion18,
      question19: newQuestion19,
      question20: newQuestion20,
      question21: newQuestion21,
      evaluator: user.email,
      date: date,
      total: sum,
      percentage: `${Math.trunc((sum / 174)*100)}%`,
    })
      .then(() => {
        navigate("/success");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function checkboxHandle() {
    setIsChecked(!isChecked);

    setHasValue(!isChecked ? 5 : 0);
  }
  function checkboxHandle2() {
    setIsChecked2(!isChecked2);

    setHasValue2(!isChecked2 ? 2 : 0);
  }
  function checkboxHandle3() {
    setIsChecked3(!isChecked3);

    setHasValue3(!isChecked3 ? 2 : 0);
  }
  function checkboxHandle4() {
    setIsChecked4(!isChecked4);

    setHasValue4(!isChecked4 ? 2 : 0);
  }
  function checkboxHandle5() {
    setIsChecked5(!isChecked5);

    setHasValue5(!isChecked5 ? 2 : 0);
  }
  function checkboxHandle6() {
    setIsChecked6(!isChecked6);

    setHasValue6(!isChecked6 ? 2 : 0);
  }
  function checkboxHandle7() {
    setIsChecked7(!isChecked7);

    setHasValue7(!isChecked7 ? 2 : 0);
  }

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
            <option value="" disabled selected>
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
            onChange={(e) => {
              setNewQuestion2(e.target.value);
              if (e.target.value == 10) {
                setIsDisabled(true);
              } else {
                setIsDisabled(false);
              }
            }}
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
            rows={2}
            className="mb-3"
            disabled={isDisabled}
            value={newQuestion3}
            onChange={(e) => {
              setNewQuestion3(e.target.value);
            }}
            style={{ resize: "none" }}
          />
          {/* disabled ha az input question2 igen, enabled ha az input question2 nem */}

          <h2 className="mb-3">II. Igényfelmérés</h2>

          <Form.Label htmlFor="inputQuestion4" className="mt-3">
            Mely kávérendszereket említette a Coffee Specialist?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion4"
            value={newQuestion4}
            onChange={(e) => {
              setNewQuestion4(e.target.value);
            }}
          >
            <option value="0">Egyiket sem</option>
            <option value="8">Vertuo</option>
            <option value="5">Original</option>
            <option value="10">Mindkét rendszert említette</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion5" className="mt-3">
            Használta a Nessoft nyújtotta információkat?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion5"
            value={newQuestion5}
            onChange={(e) => {
              setNewQuestion5(e.target.value);
              if (e.target.value == 10) {
                setIsDisabled2(false);
              } else {
                setIsDisabled2(true);
              }
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion6" className="mt-3">
            Korábbi vásárlásból vagy átlagos fogyasztásból mit használt fel?
          </Form.Label>
          <Form.Control
            as="textarea"
            id="inputQuestion6"
            rows={2}
            className="mb-3"
            disabled={isDisabled2}
            value={newQuestion6}
            onChange={(e) => {
              setNewQuestion6(e.target.value);
            }}
            style={{ resize: "none" }}
          />
          {/* enabled ha az input question5 igen, disabled ha az input question6 nem */}

          <Form.Label htmlFor="inputQuestion7" className="mt-3">
            Érdeklődött a vásárló kávéfogyasztási szokásai iránt?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion7"
            value={newQuestion7}
            onChange={(e) => {
              setNewQuestion7(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion8" className="mt-3">
            Felajánlotta a kóstolás lehetőségét?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion8"
            value={newQuestion8}
            onChange={(e) => {
              setNewQuestion8(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen, a vásárlás elején/közben</option>
            <option value="5">Igen, a vásárlás végén</option>
          </Form.Select>

          <h2 className="mb-3">III. Kapcsolat a márka és a vásárló között</h2>

          <Form.Label htmlFor="inputQuestion9" className="mt-3">
            A Coffee Specialist mesélt személyes történetet egy termékről vagy a
            márkáról?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            id="inputQuestion8"
            value={newQuestion9}
            onChange={(e) => {
              setNewQuestion9(e.target.value);
              if (e.target.value == 15) {
                setIsDisabled3(false);
              } else {
                setIsDisabled3(true);
              }
            }}
          >
            <option value="0">Nem</option>
            <option value="15">Igen</option>
          </Form.Select>
          <div>
            <Form.Text id="inputQuestion9">
              A történetmesélés olyan anekdóták vagy történetek megosztására
              vonatkozik, melyek túlmennek a termék egyszerű leírásán.
            </Form.Text>
          </div>

          <Form.Label htmlFor="inputQuestion10" className="mt-3">
            Milyen történetet mesélt?
          </Form.Label>
          <Form.Control
            as="textarea"
            id="inputQuestion10"
            rows={2}
            className="mb-3"
            disabled={isDisabled3}
            value={newQuestion10}
            onChange={(e) => {
              setNewQuestion10(e.target.value);
            }}
            style={{ resize: "none" }}
          />
          {/* enabled ha az input question8 igen, disabled ha az input question8 nem */}

          <Form.Label htmlFor="inputQuestion11" className="mt-3">
            A beszélgetést követően, releváns termékajánlás történt a
            vásárlónak?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion11"
            value={newQuestion11}
            onChange={(e) => {
              setNewQuestion11(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion12" className="mt-3">
            A vásárlás során a Coffee Specialist említette a Nespresso & You
            vagy Bónuszprogram előnyeit?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion12"
            value={newQuestion12}
            onChange={(e) => {
              setNewQuestion12(e.target.value);
            }}
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
              value={hasValue}
              name="group2"
              id="checkbox-gr2-1"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked}
              onChange={checkboxHandle}
            />
            <Form.Check
              label="Átvétel az üzletben"
              type="checkbox"
              value={hasValue2}
              name="group2"
              id="checkbox-gr2-2"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked2}
              onChange={checkboxHandle2}
            />
            <Form.Check
              label="Házhozszállítás"
              type="checkbox"
              value={hasValue3}
              name="group2"
              id="checkbox-gr2-3"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked3}
              onChange={checkboxHandle3}
            />
            <Form.Check
              label="Nespresso mobil app"
              type="checkbox"
              value={hasValue4}
              name="group2"
              id="checkbox-gr2-4"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked4}
              onChange={checkboxHandle4}
            />
            <Form.Check
              label="Nespresso weboldal"
              type="checkbox"
              value={hasValue5}
              name="group2"
              id="checkbox-gr2-5"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked5}
              onChange={checkboxHandle5}
            />
            <Form.Check
              label="Nespresso ügyfélszolgálat"
              type="checkbox"
              value={hasValue6}
              name="group2"
              id="checkbox-gr2-6"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked6}
              onChange={checkboxHandle6}
            />
            <Form.Check
              label="Nespresso and You"
              type="checkbox"
              value={hasValue7}
              name="group2"
              id="checkbox-gr2-7"
              style={{ fontSize: "1.3rem" }}
              checked={!!isChecked7}
              onChange={checkboxHandle7}
            />
          </div>

          <h2 className="mb-3">IV. Lezárás és elköszönés</h2>

          <Form.Label htmlFor="inputQuestion13" className="mt-3">
            A Coffee Specialist felhívta a figyelmet az újrahasznosítási
            szolgáltatásra és felajánlotta az ingyenes gyűjtőtasakot?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion13"
            value={newQuestion13}
            onChange={(e) => {
              setNewQuestion13(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion14" className="mt-3">
            Udvariasan, újabb látogatásra invitálta a vásárlót. Jó egészséget
            kívánt neki. (vagy kávékóstolásra invitálja-e a Coffee Specialist a
            vásárlót?)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion14"
            value={newQuestion14}
            onChange={(e) => {
              setNewQuestion14(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion15" className="mt-3">
            Kért-e visszajelzést az aktuális vásárlási élményről?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            id="inputQuestion15"
            value={newQuestion15}
            onChange={(e) => {
              setNewQuestion15(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="1">Igen</option>
          </Form.Select>
          <div>
            <Form.Text id="inputQuestion15">
              Például: "Bízom benne, hogy megtaláltuk a kedvencét...", "Bízom
              benne, hogy jól érzete magát nálunk...", "Sikerült minden
              kérdésére megtalálni a választ...", "Örülök, hogy nálunk vásárolt,
              remélem hamarosan viszontlátjuk...", "Örülök, hogy hozzánk fordult
              a problémával..."
            </Form.Text>
          </div>

          <Form.Label htmlFor="inputQuestion16" className="mt-3">
            Felhívta a figyelmet a lehetséges vásárlói kérdőívre, egyéb
            visszajelzési lehetőségekre?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion16"
            value={newQuestion16}
            onChange={(e) => {
              setNewQuestion16(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="1">Igen</option>
          </Form.Select>

          <h2 className="mb-3">
            V. Coffee Specialist viselkedése, személyes vélemény
          </h2>

          <Form.Label htmlFor="inputQuestion17" className="mt-3">
            Az értékesítés során a Coffee Specialist aktív és érdeklődő volt?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion17"
            value={newQuestion17}
            onChange={(e) => {
              setNewQuestion17(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion18" className="mt-3">
            Akítv hallgatás és empátia jellemezte a beszélgetést? (igények
            újrafogalmazása, megerősítés, ösztönző kérdések, szemkontaktus)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion18"
            value={newQuestion18}
            onChange={(e) => {
              setNewQuestion18(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion19" className="mt-3">
            A beszélgetés légköre barátságos volt, a Coffee Specialist
            mosolygott?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion19"
            value={newQuestion19}
            onChange={(e) => {
              setNewQuestion19(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion20" className="mt-3">
            Megpróbált-e személyes kapcsolatot kialakítani?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion20"
            value={newQuestion20}
            onChange={(e) => {
              setNewQuestion20(e.target.value);
            }}
          >
            <option value="0">Nem</option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion21" className="mt-3">
            Milyennek érezted a vásárlást? Egyéb visszajelzés?
          </Form.Label>
          <Form.Control
            as="textarea"
            id="inputQuestion21"
            rows={3}
            value={newQuestion21}
            onChange={(e) => {
              setNewQuestion21(e.target.value);
            }}
            style={{ resize: "none" }}
          />

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
