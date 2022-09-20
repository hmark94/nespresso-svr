import { registerables } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { fdb } from "../../firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

export default function AlleeResultsComponents() {
  const [alleeResults, setAlleeResults] = useState([]);

  // put data to collection
  const [januaryResult, setJanuaryResult] = useState(0);
  const [februaryResult, setFebruaryResult] = useState(0);
  const [marchResult, setMarchResult] = useState(0);
  const [aprilResult, setAprilResult] = useState(0);
  const [mayResult, setMayResult] = useState(0);
  const [juneResult, setJuneResult] = useState(0);
  const [julyResult, setJulyResult] = useState(0);
  const [augustResult, setAugustResult] = useState(0);
  const [septemberResult, setSeptemberResult] = useState(0);
  const [octoberResult, setOctoberResult] = useState(0);
  const [novemberResult, setNovemberResult] = useState(0);
  const [decemberResult, setDecemberResult] = useState(0);

  // collection ref
  const colRef = collection(fdb, "alleeBtq");

  // get collection data
  useEffect(() => {
    const getData = async () => {
      await getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setAlleeResults({ ...doc.data(), id: doc.id });
        });
      });
    };

    getData()
      .then(() => {
        setJanuaryResult(
          alleeResults.januaryResults.reduce((a, b) => a + b) /
            (alleeResults.januaryResults.length - 1)
        );
        setFebruaryResult(
          alleeResults.februaryResults.reduce((a, b) => a + b) /
            (alleeResults.februaryResults.length - 1)
        );
        setMarchResult(
          alleeResults.marchResults.reduce((a, b) => a + b) /
            (alleeResults.marchResults.length - 1)
        );
        setAprilResult(
          alleeResults.aprilResults.reduce((a, b) => a + b) /
            (alleeResults.aprilResults.length - 1)
        );
        setMayResult(
          alleeResults.mayResults.reduce((a, b) => a + b) /
            (alleeResults.mayResults.length - 1)
        );
        setJuneResult(
          alleeResults.juneResults.reduce((a, b) => a + b) /
            (alleeResults.juneResults.length - 1)
        );
        setJulyResult(
          alleeResults.julyResults.reduce((a, b) => a + b) /
            (alleeResults.julyResults.length - 1)
        );
        setAugustResult(
          alleeResults.augustResults.reduce((a, b) => a + b) /
            (alleeResults.augustResults.length - 1)
        );
        setSeptemberResult(
          alleeResults.septemberResults.reduce((a, b) => a + b) /
            (alleeResults.septemberResults.length - 1)
        );
        setOctoberResult(
          alleeResults.octoberResults.reduce((a, b) => a + b) /
            (alleeResults.octoberResults.length - 1)
        );
        setNovemberResult(
          alleeResults.novemberResults.reduce((a, b) => a + b) /
            (alleeResults.novemberResults.length - 1)
        );
        setDecemberResult(
          alleeResults.decemberResults.reduce((a, b) => a + b) /
            (alleeResults.decemberResults.length - 1)
        );
      })
      .catch((e) => console.error(e));
  }, []);

  console.log(alleeResults);
  console.log(januaryResult);

  return (
    <Line
      data={{
        labels: [
          "január",
          "február",
          "március",
          "április",
          "május",
          "június",
          "július",
          "augusztus",
          "szeptember",
          "október",
          "november",
          "december",
        ],
        datasets: [
          {
            label: "átlag",
            data: [
              { januaryResult },
              { februaryResult },
              { marchResult },
              { aprilResult },
              { mayResult },
              { juneResult },
              { julyResult },
              { augustResult },
              { septemberResult },
              { octoberResult },
              { novemberResult },
              { decemberResult },
            ],
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }}
      height={200}
      width={300}
      options={{ maintainAspectRatio: false }}
    />
  );
}
