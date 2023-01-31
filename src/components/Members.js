import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/members.css'
import { db } from '../firebase'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { uid } from 'uid'
import BackButton from './shared/BackButton'

export default function Members() {
  const [member, setMember] = useState('')
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUuid, setTempUuid] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleMemberChange = (e) => {
    setMember(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }


  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setEmails([])
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map((email) => {
          setEmails((oldArray) => [...oldArray, email])
        })
      }
    })
  }, [])

  //write
  const writeToDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      member,
      email,
      uuid,
    })

    setMember('')
    setEmail('')
  }

  //update
  const handleUpdate = (email) => {
    setIsEdit(true)
    setTempUuid(email.uuid)
    setEmail(email.email)
    setMember(email.member)
  }

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      member,
      email,
      uuid: tempUuid,
    })

    setMember('')
    setEmail('')
    setIsEdit(false)
  }

  //delete
  const handleDelete = (email) => {
    remove(ref(db, `/${email.uuid}`))
  }

  return (
    <>
      <section className='form-header d-flex align-items-center'>
        <BackButton />

        <div className='form-title mx-auto'>
          <h2>Coffee Specialists</h2>
        </div>
      </section>
      
      <section className='form-body d-flex'>
        <div className='members-box d-flex flex-column align-items-center w-100'>
          <div className='searchbar mb-3 mt-3'>
            <Form.Control
              type='text'
              placeholder='Coffee Specialist...'
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              className='mb-3 w-100'
            />
          </div>
          <div className='members-email'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>E-mail</th>
                  <th className='text-center'></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {emails
                  .filter((val) => {
                    if (searchTerm === '') {
                      return val
                    } else if (
                      val.email.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((email, i) => (
                    <tr key={i}>
                      <td>{email.email}</td>
                      <td className='d-flex'>
                        <button
                          className='btn btn-warning btn-sm mr-3'
                          onClick={() => handleUpdate(email)}
                        >
                          Módosít
                        </button>
                      </td>
                      <td>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => handleDelete(email)}
                        >
                          Töröl
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='members-add d-flex flex-column align-items-center w-100'>
          <Form.Control
            type='text'
            value={member}
            onChange={handleMemberChange}
            placeholder='Coffee Specialist neve'
            className='mb-3 w-100'
          ></Form.Control>
          <Form.Control
            type='text'
            value={email}
            onChange={handleEmailChange}
            placeholder='Coffee Specialist email címe'
            className='mb-3 w-100'
          ></Form.Control>
          {isEdit ? (
            <>
              <Button
                type='submit'
                onClick={handleSubmitChange}
                className='mb-3 btn-success w-100'
              >
                Módosít
              </Button>
              <Button
                variant='danger'
                type='submit'
                onClick={() => {
                  setIsEdit(false)
                  setEmail('')
                  setMember('')
                }}
                className='w-100'
              >
                Mégse
              </Button>
            </>
          ) : (
            <Button
              variant='success'
              type='submit'
              onClick={writeToDatabase}
              className='w-100'
            >
              Hozzáad
            </Button>
          )}
        </div>
      </section>
    </>
  )
}
