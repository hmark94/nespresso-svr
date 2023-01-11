const QUESTION_DATABASE = [
  {
    id: 2,
    title: "question_database",
    routeName: "question_database",
    questions: [
      {
        id: 0,
        question:
          "Barátságosan üdvözölte a vásárlót a Coffee Specialist? (Ice-breaking)",
        type: "dropdown",
        options: ["nem", "igen"],
      },
      {
        id: 10,
        question: "Megkereste-e a Nespresso & You tagságot?",
        type: "dropdown",
        options: ["nem", "igen"],
      },
      {
        id: 20,
        question:
          "Ha nem volt klubtagsága a vásárlónak, mivel érvelt a regisztráció mellett?",
        type: "text_input",
        visible: true,
      },
      {
        id: 30,
        question: "Mely kávérendszereket említette a Coffee Specialist?",
      },
      { id: 40, question: "Használta a Nessoft nyújtotta információkat?" },
      {
        id: 50,
        question:
          "Korábbi vásárlásból vagy átlagos fogyasztásból mit használt fel?",
      },
      {
        id: 60,
        question: "Érdeklődött a vásárló kávéfogyasztási szokásai iránt?",
      },
      { id: 70, question: "Felajánlotta a kóstolás lehetőségét?" },
      {
        id: 80,
        question:
          "A Coffee Specialist mesélt személyes történetet egy termékről vagy a márkáról?",
      },
      { id: 90, question: "Milyen történetet mesélt?" },
      {
        id: 100,
        question:
          "A beszélgetést követően, releváns termékajánlás történt a vásárlónak?",
      },
      {
        id: 110,
        question:
          "A vásárlás során a Coffee Specialist említette a Nespresso & You vagy Bónuszprogram előnyeit?",
      },
      {
        id: 120,
        question:
          "Az alábbi szolgáltatások közül melyeket említette a Coffee Specialist, hogy ösztönözze, vagy megkönnyítse a jövőben a kávévásárlást?",
      },
      {
        id: 130,
        question:
          "A Coffee Specialist felhívta a figyelmet az újrahasznosítási szolgáltatásra és felajánlotta az ingyenes gyűjtőtasakot?",
      },
      {
        id: 140,
        question:
          "Udvariasan, újabb látogatásra invitálta a vásárlót. Jó egészséget kívánt neki. (vagy kávékóstolásra invitálja-e a Coffee Specialist a vásárlót?)",
      },
      {
        id: 150,
        question: "Kért-e visszajelzést az aktuális vásárlási élményről?",
      },
      {
        id: 160,
        question:
          "Felhívta a figyelmet a lehetséges vásárlói kérdőívre, egyéb visszajelzési lehetőségekre?",
      },
      {
        id: 170,
        question:
          "Az értékesítés során a Coffee Specialist aktív és érdeklődő volt?",
      },
      {
        id: 180,
        question:
          "Akítv hallgatás és empátia jellemezte a beszélgetést? (igények újrafogalmazása, megerősítés, ösztönző kérdések, szemkontaktus)",
      },
      {
        id: 190,
        question:
          "A beszélgetés légköre barátságos volt, a Coffee Specialist mosolygott?",
      },
      { id: 200, question: "Megpróbált-e személyes kapcsolatot kialakítani?" },
      {
        id: 210,
        question: "Milyennek érezted a vásárlást? Egyéb visszajelzés?",
      },
    ],
  },
];

export default QUESTION_DATABASE;
