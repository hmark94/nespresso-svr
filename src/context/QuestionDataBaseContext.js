const QUESTION_DATABASE = {
  id: 2,
  title: 'question_database',
  routeName: 'question_database',
  questions: [
    {
      id: 0,
      question:
        'I. Kapcsolatteremtés',
      type: 'paragraph',
      options: null,
      value: null,
      isRequired: false,
    },
    {
      id: 5,
      question:
        'Barátságosan üdvözölte a vásárlót a Coffee Specialist? (Ice-breaking)',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 10,
      question: 'Megkereste-e a Nespresso & You tagságot?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 20,
      question:
        'Ha nem volt klubtagsága a vásárlónak, mivel érvelt a regisztráció mellett?',
      type: 'text_input',
      visible: true,
      value: 0,
      isRequired: false,
    },
    {
      id: 25,
      question:
        'II. Igényfelmérés',
      type: 'paragraph',
      options: null,
      value: null,
      isRequired: false,
    },
    {
      id: 30,
      question: 'Mely kávérendszereket említette a Coffee Specialist?',
      type: 'dropdown',
      options: [
        'Egyiket sem',
        'Original',
        'Vertuo',
        'Mindkét rendszert említette',
      ],
      value: 15,
      isRequired: true,
    },
    {
      id: 40,
      question: 'Használta a Nessoft nyújtotta információkat?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 50,
      question:
        'Korábbi vásárlásból vagy átlagos fogyasztásból mit használt fel?',
      type: 'text_input',
      visible: true,
      value: 0,
      isRequired: false,
    },
    {
      id: 60,
      question: 'Érdeklődött a vásárló kávéfogyasztási szokásai iránt?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 70,
      question: 'Felajánlotta a kóstolás lehetőségét?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 75,
      question:
        'III. Kapcsolat a márka és a vásárló között',
      type: 'paragraph',
      options: null,
      value: null,
      isRequired: false,
    },
    {
      id: 80,
      question:
        'A Coffee Specialist mesélt személyes történetet egy termékről vagy a márkáról?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      info: 'A történetmesélés olyan anekdóták vagy történetek megosztására vonatkozik, melyek túlmennek a termék egyszerű leírásán.',
      isRequired: true,
    },
    {
      id: 90,
      question: 'Milyen történetet mesélt?',
      type: 'text_input',
      visible: true,
      value: 0,
      isRequired: false,
    },
    {
      id: 100,
      question:
        'A beszélgetést követően, releváns termékajánlás történt a vásárlónak?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 110,
      question:
        'A vásárlás során a Coffee Specialist említette a Nespresso & You vagy Bónuszprogram előnyeit?',
      type: 'dropdown',
      options: ['Nem', 'Igen', 'Csak a vásárló kérdésére reagálva'],
      value: 5,
      isRequired: true,
    },
    {
      id: 120,
      question:
        'Az alábbi szolgáltatások közül melyeket említette a Coffee Specialist, hogy ösztönözze, vagy megkönnyítse a jövőben a kávévásárlást?',
      type: 'checkbox',
      options: [
        'Bónuszprogram',
        'Átvétel az üzletben',
        'Házhozszállítás',
        'Nespresso mobil app',
        'Nespresso weboldal',
        'Nespresso ügyfélszolgálat',
        'Nespresso & You',
      ],
      value: 1,
      isRequired: false,
    },
    {
      id: 125,
      question:
        'IV. Lezárás és elköszönés',
      type: 'paragraph',
      options: null,
      value: null,
      isRequired: false,
    },
    {
      id: 130,
      question:
        'A Coffee Specialist felhívta a figyelmet az újrahasznosítási szolgáltatásra és felajánlotta az ingyenes gyűjtőtasakot?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 140,
      question:
        'Udvariasan, újabb látogatásra invitálta a vásárlót. Jó egészséget kívánt neki. (vagy kávékóstolásra invitálja-e a Coffee Specialist a vásárlót?)',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 150,
      question: 'Kért-e visszajelzést az aktuális vásárlási élményről?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      info: 'Például: "Bízom benne, hogy megtaláltuk a kedvencét...", "Bízom benne, hogy jól érzete magát nálunk...", "Sikerült minden kérdésére megtalálni a választ...", "Örülök, hogy nálunk vásárolt, remélem hamarosan viszontlátjuk...", "Örülök, hogy hozzánk fordult a problémával..."',
      isRequired: true,
    },
    {
      id: 160,
      question:
        'Felhívta a figyelmet a lehetséges vásárlói kérdőívre, egyéb visszajelzési lehetőségekre?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 165,
      question:
        'V. Coffee Specialist viselkedése, személyes vélemény',
      type: 'paragraph',
      options: null,
      value: null,
      isRequired: false,
    },
    {
      id: 170,
      question:
        'Az értékesítés során a Coffee Specialist aktív és érdeklődő volt?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 180,
      question:
        'Akítv hallgatás és empátia jellemezte a beszélgetést? (igények újrafogalmazása, megerősítés, ösztönző kérdések, szemkontaktus)',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 190,
      question:
        'A beszélgetés légköre barátságos volt, a Coffee Specialist mosolygott?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 200,
      question: 'Megpróbált-e személyes kapcsolatot kialakítani?',
      type: 'dropdown',
      options: ['Nem', 'Igen'],
      value: 5,
      isRequired: true,
    },
    {
      id: 210,
      question: 'Milyennek érezted a vásárlást? Egyéb visszajelzés?',
      type: 'text_input',
      visible: true,
      value: 0,
      isRequired: true,
    },
  ],
}

export default QUESTION_DATABASE
