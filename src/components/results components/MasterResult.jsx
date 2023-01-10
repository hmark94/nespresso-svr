import { fdb } from "../../firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { registerables } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

export default function MasterResultsComponents() {
  const [MasterResults, setMasterResults] = useState([]);

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
  const colRef = collection(fdb, "surveyResponse");
  const months = [
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
  ];
  // get collection data
  useEffect(() => {
    const getData = async () => {
      await getDocs(colRef).then((snapshot) => {
        const results = snapshot.docs.reduce((acc, item) => {
          const itemData = item.data();
          console.log({ itemData });
          const currentDate = itemData.date.split("/");
          const getMonth = new Date(
            +currentDate[2],
            currentDate[1] - 1,
            +currentDate[0]
          ).getMonth();
          itemData.percentage = itemData.percentage.replace(/\D/g, "");
          if (!!acc[itemData.btq]) {
            if (!!acc[itemData.btq][months[getMonth]]) {
              acc[itemData.btq][months[getMonth]].push(+itemData.percentage);
            } else {
              acc[itemData.btq][months[getMonth]] = [];
              acc[itemData.btq][months[getMonth]].push(+itemData.percentage);
            }
          } else {
            acc[itemData.btq] = {};
            acc[itemData.btq][months[getMonth]] = [];
            acc[itemData.btq][months[getMonth]].push(itemData.percentage);
          }
          acc[itemData.btq][months[getMonth]] = acc[itemData.btq][
            months[getMonth]
          ].reduce((acc2, item2, index) => {
            acc2 += acc2;
            return acc2 / index;
          });
          console.log(acc);
          return acc;
        }, {});
        console.log({ results });
      });
    };

    getData();
  }, []);

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
