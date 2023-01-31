import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { db, fdb } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useUserAuth } from '../context/UserAuthContext'
import NewFormDatabase from '../components/NewFormDatabase'
import BackButton from './shared/BackButton'
import EmailInput from './EmailInput'
import BtqSelect from './BtqSelect'
import SubmitButton from './shared/SubmitButton'

export default function NewForm() {
  const [emails, setEmails] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [newBtq, setNewBtq] = useState('')
  const [newQuestion1, setNewQuestion1] = useState(0)
  const [newQuestion2, setNewQuestion2] = useState(0)
  const [newQuestion3, setNewQuestion3] = useState('')
  const [newQuestion4, setNewQuestion4] = useState(0)
  const [newQuestion5, setNewQuestion5] = useState(0)
  const [newQuestion6, setNewQuestion6] = useState('')
  const [newQuestion7, setNewQuestion7] = useState(0)
  const [newQuestion8, setNewQuestion8] = useState(0)
  const [newQuestion9, setNewQuestion9] = useState(0)
  const [newQuestion10, setNewQuestion10] = useState('')
  const [newQuestion11, setNewQuestion11] = useState(0)
  const [newQuestion12, setNewQuestion12] = useState(0)
  const [newQuestion13, setNewQuestion13] = useState(0)
  const [newQuestion14, setNewQuestion14] = useState(0)
  const [newQuestion15, setNewQuestion15] = useState(0)
  const [newQuestion16, setNewQuestion16] = useState(0)
  const [newQuestion17, setNewQuestion17] = useState(0)
  const [newQuestion18, setNewQuestion18] = useState(0)
  const [newQuestion19, setNewQuestion19] = useState(0)
  const [newQuestion20, setNewQuestion20] = useState(0)
  const [newQuestion21, setNewQuestion21] = useState('')
  const [hasValue, setHasValue] = useState(0)
  const [hasValue2, setHasValue2] = useState(0)
  const [hasValue3, setHasValue3] = useState(0)
  const [hasValue4, setHasValue4] = useState(0)
  const [hasValue5, setHasValue5] = useState(0)
  const [hasValue6, setHasValue6] = useState(0)
  const [hasValue7, setHasValue7] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const [isChecked4, setIsChecked4] = useState(false)
  const [isChecked5, setIsChecked5] = useState(false)
  const [isChecked6, setIsChecked6] = useState(false)
  const [isChecked7, setIsChecked7] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isDisabled2, setIsDisabled2] = useState(true)
  const [isDisabled3, setIsDisabled3] = useState(true)
  const { user } = useUserAuth()

  let navigate = useNavigate()

  const current = new Date()
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`

  const sum =
    +newQuestion1 +
    +newQuestion2 +
    +newQuestion4 +
    +newQuestion5 +
    +newQuestion7 +
    +newQuestion8 +
    +newQuestion9 +
    +newQuestion11 +
    +newQuestion12 +
    +newQuestion13 +
    +newQuestion14 +
    +newQuestion15 +
    +newQuestion16 +
    +newQuestion17 +
    +newQuestion18 +
    +newQuestion19 +
    +newQuestion20 +
    +hasValue +
    +hasValue2 +
    +hasValue3 +
    +hasValue4 +
    +hasValue5 +
    +hasValue6 +
    +hasValue7

  const surveyResponseRef = collection(fdb, 'surveyResponse')

  const saveAnswers = async (e) => {
    e.preventDefault()

    await addDoc(surveyResponseRef, {
      email: newEmail,
      btq: newBtq,
      question01: newQuestion1,
      question02: newQuestion2,
      question03: newQuestion3,
      question04: newQuestion4,
      question05: newQuestion5,
      question06: newQuestion6,
      question07: newQuestion7,
      question08: newQuestion8,
      question09: newQuestion9,
      question10: newQuestion10,
      question11: newQuestion11,
      question12: newQuestion12,
      questionCheckbox: hasValue,
      questionCheckbox2: hasValue2,
      questionCheckbox3: hasValue3,
      questionCheckbox4: hasValue4,
      questionCheckbox5: hasValue5,
      questionCheckbox6: hasValue6,
      questionCheckbox7: hasValue7,
      question13: newQuestion13,
      question14: newQuestion14,
      question15: newQuestion15,
      question16: newQuestion16,
      question17: newQuestion17,
      question18: newQuestion18,
      question19: newQuestion19,
      question20: newQuestion20,
      question21: newQuestion21,
      evaluator: user.email,
      date: date,
      total: sum,
      percentage: `${Math.trunc((sum / 174) * 100)}%`,
    })
      .then(() => {
        navigate('/success')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  function checkboxHandle() {
    setIsChecked(!isChecked)

    setHasValue(!isChecked ? 5 : 0)
  }
  function checkboxHandle2() {
    setIsChecked2(!isChecked2)

    setHasValue2(!isChecked2 ? 2 : 0)
  }
  function checkboxHandle3() {
    setIsChecked3(!isChecked3)

    setHasValue3(!isChecked3 ? 2 : 0)
  }
  function checkboxHandle4() {
    setIsChecked4(!isChecked4)

    setHasValue4(!isChecked4 ? 2 : 0)
  }
  function checkboxHandle5() {
    setIsChecked5(!isChecked5)

    setHasValue5(!isChecked5 ? 2 : 0)
  }
  function checkboxHandle6() {
    setIsChecked6(!isChecked6)

    setHasValue6(!isChecked6 ? 2 : 0)
  }
  function checkboxHandle7() {
    setIsChecked7(!isChecked7)

    setHasValue7(!isChecked7 ? 2 : 0)
  }

  return (
    <>
      <section className='form-header mb-3 mt-6'>
        <BackButton />

        <div className='d-flex align-items-center justify-content-between'>
          <h1>Short Visit Report</h1>
        </div>
        <div></div>
      </section>

      <section className='form-body d-flex align-items-center'>
        <Form onSubmit={saveAnswers}>
          <EmailInput onEmailsUpdate={(newEmails) => setEmails(newEmails)} />

          <BtqSelect onBtqSelect={(newBtq) => setNewBtq(newBtq)} />

          <NewFormDatabase />

          <Form.Label className='mt-3 fw-bolder'>Kitöltő:</Form.Label>
          <span className='ms-2'>{user && user.email}</span>

          <div className='mt-3 mb-3 d-grid'>
            <SubmitButton />
          </div>
        </Form>
        <div className='form-footer'>
          *küldés előtt, győződj meg róla, hogy mindent helyesen töltöttél ki
        </div>
      </section>
    </>
  )
}
