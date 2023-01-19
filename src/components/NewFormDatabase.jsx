import React, { useEffect } from 'react'
import '../css/newformdatabase.css'
import QUESTION_DATABASE from '../context/QuestionDataBaseContext'

function NewFormDatabase() {
  const questionsData = QUESTION_DATABASE.questions

  const renderQuestions = questionsData.map((question) => {
    if (question.type === 'dropdown') {
      return (
        <div className='question_box' key={question.id}>
          <div className='question_line'>{question.question}</div>
          <div className={`answer_${question.type}`}>
            <select id={question.id} required={question.isRequired}>
              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {question.info ? <div className='question_info'>{question.info}</div> : null}
        </div>
      )
    } else if (question.type === 'text_input') {
      return (
        <div className='question_box' key={question.id}>
          <div className='question_line'>{question.question}</div>
          <div className={`answer_${question.type}`}>
            <textarea
              id={question.id}
              rows='3'
              cols='40'
              required={question.isRequired}
              style={{ resize: 'none' }}
              disabled={!question.visible}
            ></textarea>
          </div>
        </div>
      )
    } else if (question.type === 'checkbox') {
      return (
        <div className='question_box' key={question.id}>
          <div className='question_line'>{question.question}</div>
          <div className={`answer_${question.type}`}>
            {question.options.map((option, index) => (
              <div key={index}>
                <input type='checkbox' id={option} value={option} />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      )
    }
  })

  return <>{renderQuestions}</>
}

export default NewFormDatabase
