import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

function SubmitButton() {
  return (
    <>
      {' '}
      <Button variant='success' type='submit' size='lg'>
        Küldés
      </Button>
    </>
  )
}

export default SubmitButton
