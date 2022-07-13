import React, { useState, useEffect } from "react";
import NavbarComponent from "./navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
import { useUserAuth } from "../context/UserAuthContext";

export default function NewForm() {
  const [emails, setEmails] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    if (isLoading) {
      NewForm().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleLoading = () => setLoading(true);

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

          <h2 className="mb-3">I. Megjelenés</h2>
          <Form.Check
            label="A Coffee Specialist megjelenése kifogástalan"
            type="checkbox"
            id="default-checkbox-1"
            style={{ fontSize: "1.3rem" }}
          />
          <Form.Check
            label="A pult tiszta és rendezett"
            type="checkbox"
            id="default-checkbox-2"
            style={{ fontSize: "1.3rem" }}
            className="mb-3"
          />

          <h2 className="mb-3">II. Kapcsolatteremtés</h2>

          <Form.Label htmlFor="inputQuestion1" className="mt-3">
            Barátságos hangnemben, személyes mondattal, kérdéssel üdvözölte a
            vásárlót a Coffee Specialist? (Ice-breaking)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion1"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion2" className="mt-3">
            Érdeklődött-e a Nespresso & You tagságról, megkereste-e a
            klubtagságot?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion2"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion3" className="mt-3">
            Említette-e a Nespresso & You tagsági szintet/Lehetséges szintet?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion3"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <h2 className="mb-3">III. Igényfelmérés</h2>

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
            Érdeklődött a vásárló kávéfogyasztási szokásai iránt?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion4"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
            <option value="5">Részben</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion5" className="mt-3">
            Megtalálta a vásárló igényeinek megfelelő kávét?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion5"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
            <option value="5">Részben</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion6" className="mt-3">
            Használta a Nessoft nyújtotta információkat?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion6"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
            <option value="5">Részben</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion7" className="mt-3">
            Felajánlotta a kóstolás lehetőségét?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion7"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen, a vásárlás elején/közben</option>
            <option value="5">Igen, a vásárlás végén</option>
          </Form.Select>

          <h2 className="mb-3">IV. Vásárlói élmény fokozása</h2>

          <Form.Label htmlFor="inputQuestion8" className="mt-3">
            A Coffee Specialist mesélt anekdótát egy termékről vagy a márkáról?
          </Form.Label>
          <Form.Select aria-label="Default select example" id="inputQuestion8">
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="15">Igen</option>
            <option value="5">Részben</option>
          </Form.Select>
          <div>
            <Form.Text id="inputQuestion8">
              A történetmesélés olyan anekdóták vagy történetek megosztására
              vonatkozik, melyek túlmennek a termék egyszerű leírásán.
            </Form.Text>
          </div>

          <Form.Label htmlFor="inputQuestion9" className="mt-3">
            Ajánlott a Coffee Specialist bármilyen további terméket?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion9"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion10" className="mt-3">
            Bemutatta a vásárló számára nyújtott előnyeit a terméknek?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion10"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <h2 className="mb-3">V. Zárás és Márkahűség megerősítése</h2>

          <Form.Label htmlFor="inputQuestion11" className="mt-3">
            A vásárlás során a Coffee Specialist említette a Nespresso & You
            vagy Bónuszprogram előnyeit?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion11"
          >
            <option value="0" selected="selected">
              Nem
            </option>
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
              id="checkbox-1"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Átvétel az üzletben"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-2"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Házhozszállítás"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-3"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso mobil app"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-4"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso weboldal"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-5"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso ügyfélszolgálat"
              type="checkbox"
              value="2"
              name="group2"
              id="checkbox-6"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nespresso and You"
              type="checkbox"
              value="5"
              name="group2"
              id="checkbox-7"
              style={{ fontSize: "1.3rem" }}
            />
            <Form.Check
              label="Nem említett szolgáltatásokat"
              type="checkbox"
              value="0"
              name="group2"
              id="checkbox-8"
              style={{ fontSize: "1.3rem" }}
            />
          </div>

          <Form.Label htmlFor="inputQuestion12" className="mt-3">
            A Coffee Specialist felhívta a figyelmet az újrahasznosítási
            szolgáltatásra és felajánlotta az ingyenes gyűjtőtasakot?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion12"
          >
            <option value="0" selected="selected">
              Nem
            </option>
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
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <h2 className="mb-3">
            VI. Coffee Specialist viselkedése, személyes vélemény
          </h2>

          <Form.Label htmlFor="inputQuestion14" className="mt-3">
            Az értékesítés során a Coffee Specialist aktív és érdeklődő volt?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion14"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion15" className="mt-3">
            Akítv hallgatás és empátia jellemezte a beszélgetést? (igények
            újrafogalmazása, megerősítés, ösztönző kérdések, szemkontaktus)
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion15"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion16" className="mt-3">
            A beszélgetés légköre barátságos volt, a Coffee Specialist
            mosolygott?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion16"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion17" className="mt-3">
            Megpróbált-e személyes kapcsolatot kialakítani?
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            id="inputQuestion17"
          >
            <option value="0" selected="selected">
              Nem
            </option>
            <option value="10">Igen</option>
          </Form.Select>

          <Form.Label htmlFor="inputQuestion18" className="mt-3">
            Milyennek érezted a vásárlást? Egyéb visszajelzés?
          </Form.Label>
          <Form.Control as="textarea" rows={3} />

          <Form.Label className="mt-3">Kitöltő: {user && user.email}</Form.Label>

          <div className="mt-3 mb-3 d-grid">
            <Button
              variant="success"
              type="submit"
              size="lg"
              disabled={isLoading}
              onClick={!isLoading ? handleLoading : null}
            >
              {isLoading ? "Kis türelmet..." : "Küldés"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
