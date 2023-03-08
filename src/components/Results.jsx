import { useEffect, useState, useMemo, useCallback } from 'react'
import { fdb } from '../firebase'
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import SVR_APP_DATA from '../context/DataBaseContext'
import BackButton from './shared/BackButton'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import Spinner from './shared/Spinner'
import '../css/resultsStyle.css'

export default function Results() {
  const [average, setAverage] = useState(null)
  const [avPercentage, setAvPercentage] = useState(null)
  const [averageOfTheMonth, setAverageOfTheMonth] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const responseDocs = collection(fdb, 'surveyResponse')

  /*Date functions*/
  // Create a new Date object for the current date
  const currentDate = new Date()

  // Get the year and month of the current date
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Create a new Date object for the start of the current month
  const startOfMonth = new Date(currentYear, currentMonth, 1)

  // Create a new Date object for the end of the current month
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0)

  // Convert the start and end of month dates to Firestore Timestamps
  const startOfMonthTimestamp = Timestamp.fromDate(startOfMonth)
  const endOfMonthTimestamp = Timestamp.fromDate(endOfMonth)

  const calculateAverage = async () => {
    const totalQuerySnapshot = await getDocs(collection(fdb, 'surveyResponse'))

    const total = totalQuerySnapshot.docs.reduce(
      (accumulator, doc) => accumulator + doc.data().total,
      0
    )

    const percentageTotal = totalQuerySnapshot.docs.reduce(
      (accumulator, doc) =>
        accumulator +
        Number(
          doc.data().percentage.substring(0, doc.data().percentage.length - 1)
        ),
      0
    )

    /*Calculate the average of the actual month*/

    const q = query(
      responseDocs,
      where('date', '>=', startOfMonthTimestamp),
      where('date', '<=', endOfMonthTimestamp)
    )

    const getResponseDocs = await getDocs(q)
    const docs = []
    let totalPoints = 0
    getResponseDocs.forEach((doc) => {
      const data = doc.data()
      totalPoints += data.total
      docs.push({ id: doc.id, ...data })
    })

    /*Calculating the averages functions*/
    const averageCount = total / totalQuerySnapshot.size
    const averagePercentage = percentageTotal / totalQuerySnapshot.size
    const averagePoints = docs.length ? totalPoints / docs.length : 0

    setAverage(averageCount.toFixed(1))
    setAvPercentage(averagePercentage.toFixed(1))
    setAverageOfTheMonth(averagePoints)
  }

  const calculateMonthlyAverage = useMemo(() => async (boutiqueId) => {
    const monthlyAverages = []
  
    for (let month = 1; month <= 12; month++) {
      const strtMonth = new Date(currentYear, month - 1, 1)
      const endMonth = new Date(currentYear, month, 0)
  
      const strtMonthTimestamp = Timestamp.fromDate(strtMonth)
      const endMonthTimestamp = Timestamp.fromDate(endMonth)
  
      //query for the month
      const q = query(
        responseDocs,
        where('btq', '==', boutiqueId),
        where('date', '>=', strtMonthTimestamp),
        where('date', '<=', endMonthTimestamp)
      )
  
      const qSnapshot = await getDocs(q)
      const total = qSnapshot.docs.reduce((acc, doc) => {
        return (
          acc +
          Number(
            doc.data().percentage.substring(0, doc.data().percentage.length - 1)
          )
        )
      }, 0)
  
      const average = qSnapshot.size > 0 ? total / qSnapshot.size : null
  
      // push the average to monthlyAverages array
      monthlyAverages.push(average)
    }
  
    return monthlyAverages
  }, [currentYear, responseDocs])

  useEffect(() => {
    calculateAverage()
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const chartData = await Promise.all(
        SVR_APP_DATA[0].items.map(async (e) => {
          const monthlyAverages = await calculateMonthlyAverage(e.boutique_id);

          const data = {
            labels: [
              'Január',
              'Február',
              'Március',
              'Április',
              'Május',
              'Június',
              'Július',
              'Augusztus',
              'Szeptember',
              'Október',
              'November',
              'December',
            ],
            datasets: [
              {
                label: 'Eredmények',
                fill: false,
                lineTension: 0.01,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 7,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: monthlyAverages,
              },
            ],
          };

          return (
            <div className='mb-4 w-auto' key={e.boutique_id}>
              <Link to={`/results/${e.route}`}>
                <Card className='card h-100'>
                  <Card.Header
                    className='card-header text-center'
                    style={{
                      background: 'rgb(243 238 230)',
                      fontWeight: '600',
                    }}
                  >
                    {e.boutique_name}
                  </Card.Header>
                  <Card.Body className='card-body d-flex justify-content-center'>
                    <Line data={data} />
                  </Card.Body>
                </Card>
              </Link>
            </div>
          );
        })
      );

      setChartData(chartData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return (
    <>
      <section className='form-header d-flex align-items-center'>
        <BackButton />

        <div className='form-title mx-auto'>
          <h1>Eredmények</h1>
        </div>
      </section>

      <div className='results-top mb-4 mt-4'>
        <h4>
          Havi átlag: <strong>{averageOfTheMonth}</strong>
        </h4>
        <br />
        <h4>
          Éves átlag: <strong>{average}</strong> /{' '}
          <strong>{avPercentage}%</strong>
        </h4>
      </div>

      <div className='results-body mx-auto'>
        {isLoading ? <Spinner /> : chartData}
      </div>
    </>
  )
}
