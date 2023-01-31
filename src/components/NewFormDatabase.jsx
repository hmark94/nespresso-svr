import React, { useEffect } from 'react'
import '../css/newformdatabase.css'
import { Form, Dropdown } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import QUESTION_DATABASE from '../context/QuestionDataBaseContext'

function NewFormDatabase() {
  const questionsData = QUESTION_DATABASE.questions

  const renderQuestions = questionsData.map((question) => {
    if (question.type === 'dropdown') {
      return (
        <div className='question_box mt-2 mb-3' key={question.id}>
          <Form.Label className='fw-bold'>
            {question.question}
          </Form.Label>
          <Form.Group controlId={question.id}>
            <Form.Control
              as='select'
              required={question.isRequired}
              className='form-control'
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
          <Form.Label className='fw-bold'>
            {question.question}
          </Form.Label>
          <Form.Group controlId={question.id}>
            <Form.Control
              as='textarea'
              rows='3'
              required={question.isRequired}
              disabled={!question.visible}
              style={{ resize: 'none' }}
              className='form-control'
            />
          </Form.Group>
        </div>
      )
    } else if (question.type === 'checkbox') {
      return (
        <div className='question_box mt-2 mb-3' key={question.id}>
          <Form.Label className='fw-bold'>
            {question.question}
          </Form.Label>
          <Form.Group controlId={question.id}>
            {question.options.map((option, index) => (
              <Form.Check
                key={index}
                type='checkbox'
                label={option}
                value={option}
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
