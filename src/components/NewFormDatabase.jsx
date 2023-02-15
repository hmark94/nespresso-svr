import React, { useEffect, useRef, useState } from 'react'
import '../css/newformdatabase.css'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import QUESTION_DATABASE from '../context/QuestionDataBaseContext'

function NewFormDatabase({ onAnswerUpdate }) {
  const questionsData = QUESTION_DATABASE.questions
  const [answers, setAnswers] = useState({})


  useEffect(() => {
    onAnswerUpdate({ answers })
  }, [answers])

  const renderQuestions = questionsData.map((question) => {
    const onAnswerUpdate = (e, questionId) => {
      if (question.type === 'checkbox') {
        if (e.target.checked) {
          setAnswers({
            ...answers,
            [questionId]: [...(answers[questionId] || []), e.target.value],
          })

        } else {
          setAnswers({
            ...answers,
            [questionId]: (answers[questionId] || []).filter(
              (answer) => answer !== e.target.value
            ),
          })

        }
      } else {
        setAnswers({
          ...answers,
          [questionId]: e.target.value,
        })
      }
    }

    if (question.type === 'dropdown') {
      return (
        <div className='question_box mt-2 mb-3' key={question.id}>
          <Form.Label className='fw-bold'>{question.question}</Form.Label>
          <Form.Group controlId={question.id}>
            <Form.Control
              as='select'
              required={question.isRequired}
              className='form-control'
              onChange={(e) => onAnswerUpdate(e, question.id)}
            >
              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {question.info ? (
            <p className='fw-lighter fst-italic'>{question.info}</p>
          ) : null}
        </div>
      )
    } else if (question.type === 'text_input') {
      return (
        <div className='question_box mt-2 mb-3' key={question.id}>
          <Form.Label className='fw-bold'>{question.question}</Form.Label>
          <Form.Group controlId={question.id}>
            <Form.Control
              as='textarea'
              rows='3'
              required={question.isRequired}
              disabled={!question.visible}
              style={{ resize: 'none' }}
              className='form-control'
              onChange={(e) => onAnswerUpdate(e, question.id)}
            />
          </Form.Group>
        </div>
      )
    } else if (question.type === 'checkbox') {
      return (
        <div className='question_box mt-2 mb-3' key={question.id}>
          <Form.Label className='fw-bold'>{question.question}</Form.Label>
          <Form.Group controlId={`${question.id}`}>
            {question.options.map((option, index) => (
              <Form.Check
                className='form-control-lg'
                key={index}
                type='checkbox'
                label={option}
                value={option}
                id={`${question.id}_${index}`}
                onChange={(e) => onAnswerUpdate(e, question.id)}
              />
            ))}
          </Form.Group>
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

  return <>{renderQuestions}</>
}

export default NewFormDatabase
