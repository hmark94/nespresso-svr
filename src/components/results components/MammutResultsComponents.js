import { registerables } from "chart.js";
import { Line } from "react-chartjs-2";

export default function MammutResultsComponents() {
  return (
    <Line
      data={{
        labels: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
        datasets: [
          {
            label: "átlag",
            data: [45, 35, 72, 34, 61, 23],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
        ],
      }}
      height={200}
      width={300}
      options={{ maintainAspectRatio: false }}
    />
  );
}
