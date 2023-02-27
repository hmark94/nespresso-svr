import { useEffect, useState } from 'react'
import { fdb } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import SVR_APP_DATA from '../context/DataBaseContext'
import BackButton from './shared/BackButton'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import '../css/resultsStyle.css'

export default function Results() {
  const [average, setAverage] = useState(0)
  const [avPercentage, setAvPercentage] = useState(0)
  const resultsRef = collection(fdb, 'surveyResponse')

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
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 0, 10, 50],
      },
    ],
  }

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

    const averageCount = total / totalQuerySnapshot.size
    const averagePercentage = percentageTotal / totalQuerySnapshot.size

    setAverage(averageCount)
    setAvPercentage(averagePercentage.toFixed(1))

  }

  useEffect(() => {
    calculateAverage()
  }, [])

  const readData = SVR_APP_DATA[0].items.map((e, i) => (
    <div className='mb-4 w-auto' key={e.boutique_id}>
      <Link to={`/results/${e.route}`}>
        <Card className='card h-100'>
          <Card.Header
            className='card-header text-center'
            style={{ background: 'rgb(243 238 230)', fontWeight: '600' }}
          >
            {e.boutique_name}
          </Card.Header>
          <Card.Body className='card-body d-flex justify-content-center'>
            <Line data={data} />
          </Card.Body>
        </Card>
      </Link>
    </div>
  ))

  return (
    <>
      <section className='form-header d-flex align-items-center'>
        <BackButton />

        <div className='form-title mx-auto'>
          <h1>Eredmények</h1>
        </div>
      </section>

      <div className='results-top mb-4 mt-4'>
        Havi átlag:
        <br />
        <h4>
          Éves átlag: <strong>{average}</strong> / <strong>{avPercentage}%</strong>
        </h4>
      </div>

      <div className='results-body mx-auto'>{readData}</div>
    </>
  )
}
