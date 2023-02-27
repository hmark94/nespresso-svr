import BackButton from './shared/BackButton'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import QUESTION_DATABASE from '../context/QuestionDataBaseContext'
import { fdb } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from './shared/Spinner'
import { Form } from 'react-bootstrap'

function SurveyResultPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState({})

  const questionsData = QUESTION_DATABASE.questions
  const docRef = doc(fdb, 'surveyResponse', `${id}`)

  const getAnswer = async () => {
    const docSnapshot = await getDoc(docRef)
    const response = []
    if (docSnapshot.exists()) {
      response.push({ ...docSnapshot.data() })
      setAnswers(response[0])
    } else {
      setAnswers(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getAnswer().finally(() => setIsLoading(false))
  }, [])

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className='form-header mb-3 mt-6'>
        <BackButton />

        <div className='d-flex align-items-center justify-content-between'>
          <div className='m-4'>
            <h1>SVR Eredmény</h1>
          </div>
        </div>
        <div></div>
      </section>

      <section className='mb-4 mt-6'>
        <p>{answers?.email}</p>
        <p>
          <strong>Kitöltő:</strong> {answers?.evaluator}
        </p>
        <p>
          <strong>Dátum:</strong>{' '}
          {answers?.date?.toDate().toString().substring(0, 24)}
        </p>
        <p>
          <strong>Eredmény:</strong> 104/{answers?.total}
        </p>
        <p>
          <strong>Százalék:</strong> {answers?.percentage}
        </p>
      </section>

      <section>
        {answers ? (
          questionsData.map((question) => {
            const answer = answers?.answers?.answers[question.id]

            if (question.type === 'dropdown') {
              return (
                <div className='question_box mt-2 mb-3' key={question.id}>
                  <Form.Label className='fw-bold'>
                    {question.question}
                  </Form.Label>
                  <option key={question.id}>{answer}</option>
                </div>
              )
            } else if (question.type === 'text_input') {
              return (
                <div className='question_box mt-2 mb-3' key={question.id}>
                  <Form.Label className='fw-bold'>
                    {question.question}
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    value={answer}
                    style={{ resize: 'none' }}
                    disabled
                  >
                  </Form.Control>
                </div>
              )
            } else if (question.type === 'checkbox') {
              return (
                <div className='question_box mt-3 mb-3' key={question.id}>
                  <Form.Label className='fw-bold'>
                    {question.question}
                  </Form.Label>
                  <ul>
                    {answer && typeof answer === 'object' ? (
                      Object.values(answer).map((item) => (
                        <li style={{ listStyle: 'none' }} key={item}>
                          {item}
                        </li>
                      ))
                    ) : (
                      <li style={{ listStyle: 'none' }}>Nincs válasz</li>
                    )}
                  </ul>
                </div>
              )
            } else if (question.type === 'paragraph') {
              return (
                <h2 className='paragraph mb-5 mt-5' key={question.id}>
                  {question.question}
                </h2>
              )
            }
          })
        ) : (
          <p>No data 404</p>
        )}
      </section>
    </>
  )
}
export default SurveyResultPage
