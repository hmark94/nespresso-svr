import BackButton from './shared/BackButton'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import QUESTION_DATABASE from '../context/QuestionDataBaseContext'
import { fdb } from '../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import Spinner from './shared/Spinner'

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
      response.push({ id: docSnapshot.id, ...docSnapshot.data() })
      setAnswers(response[0])
    } else {
      setAnswers(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getAnswer().finally(() => setIsLoading(false))
  }, [id])



  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className='form-header mb-3 mt-6'>
        <BackButton />

        <div className='d-flex align-items-center justify-content-between'>
          <div className='m-4'>
            <h1>{}</h1>
          </div>
        </div>
      </section>

      <section>

      </section>
    </>
  )
}
export default SurveyResultPage
