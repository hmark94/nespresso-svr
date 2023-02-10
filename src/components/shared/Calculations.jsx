export const sum = (a, b) => a + b;
export const percentage = (a, b) => (a / b) * 100;
export const average = (numbers) =>
  numbers.reduce((a, b) => a + b, 0) / numbers.length;


  const createChartDataSet = () => {
    const data = "snapshot";

    let chartDataArray = data.map((btq) => {
      const aggregatedResult = data.result.reduce((acc, curr) => {
        // return [65, 59, 80, 81, 56, 55, 40, 0, 10, 100],
      }, []);

      return {
        btq_id: "btq.resulst.btq-id",
        btq_name: "string",
        chart_data: {
          labels: [
            "Január",
            "Február",
            "Március",
            "Április",
            "Május",
            "Június",
            "Július",
            "Augusztus",
            "Szeptember",
            "Október",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Eredmények",
              fill: false,
              lineTension: 0.01,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: aggregatedResult,
            },
          ],
        },
      };
    });
  };