import React, { useState, useRef } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useUserAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('A jelszavak nem egyeznek!')
    }

    try {
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('A regisztráció sikertelen volt!')
    }
    setLoading(false)
  }

  return (
    <>
      <div className='modal-content rounded-4 border-0 shadow mx-auto sigUp-box'>
        <div className='p-4 box'>
          <h2 className='mb-5 text-center'>Fiók létrehozása</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className='form-floating mb-3'
              controlId='formBasicEmail'
            >
              <Form.Control
                className='form-control-lg'
                type='email'
                placeholder='Email cím'
                pattern='.+@nespresso\.com'
                ref={emailRef}
                required
              />
              <label htmlFor='floatingInput'>Email cím</label>
              <div id='emailHelp' className='form-text text-center'>
                Használd a '@nespresso.com' email címedet.
              </div>
            </Form.Group>

            <Form.Group
              className='form-floating mb-3'
              controlId='formBasicPassword'
            >
              <Form.Control
                type='password'
                placeholder='Jelszó'
                ref={passwordRef}
                required
              />
              <label htmlFor='floatingInput'>Jelszó</label>
            </Form.Group>

            <Form.Group
              className='form-floating mb-3'
              controlId='formBasicPasswordConfirm'
            >
              <Form.Control
                type='password'
                placeholder='Jelszó megerősítése'
                ref={passwordConfirmRef}
                required
              />
              <label htmlFor='floatingInput'>Jelszó megerősítése</label>
            </Form.Group>

            <div className='d-grid gap-2'>
              <Button disabled={loading} variant='primary' type='submit'>
                Regisztráció
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className='p-4 box mt-3 text-center mx-auto accountLogin-box'>
        Van már fiókod? <Link to='/'>Lépj be!</Link>{' '}
      </div>
    </>
  )
}
