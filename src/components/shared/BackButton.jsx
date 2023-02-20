import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function BackButton() {
  const navigate = useNavigate()

  return (
    <div className='back-button'>
      <Button variant='warning' onClick={() => navigate(-1)}>
        Vissza
      </Button>
    </div>
  )
}

export default BackButton
