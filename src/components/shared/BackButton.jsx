import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function BackButton() {
  let navigate = useNavigate()
  function handleClick() {
    navigate('/home')
  }
  return (
    <div className='back-button'>
      <Button variant='warning' onClick={handleClick}>
        Vissza
      </Button>
    </div>
  )
}

export default BackButton
