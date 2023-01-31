import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { Button, NavbarBrand, Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { Navigate } from 'react-router-dom'
import Logo from '../../Logo/Nespresso-Logotype-Correct-2048x533-copy.png'

export default function NavbarComponent() {
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { user, logOut } = useUserAuth()

  async function handleLogOut() {
    setError('')

    try {
      await logOut()
      Navigate('/')
    } catch {
      setError('Kijelentkezés sikertelen!')
    }
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest('.navbar-collapse')) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  return (
    <>
      <Navbar bg='headerBg' fixed='top' expand='lg'>
        <NavbarBrand>
          <a className='navbar-brand' href='/home'>
            <img
              src={Logo}
              width='160'
              height='30'
              className='d-inline-block align-top'
              alt='Nespresso logo'
            />
          </a>
        </NavbarBrand>

        <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} />
        <Navbar.Collapse style={{ justifyContent: 'flex-end' }} className={isOpen ? "show" : ""}>
          <Nav>
            <Navbar.Text style={{ paddingRight: '8px' }}>
              Bejelentkezve mint: <a>{user && user.email}</a>
            </Navbar.Text>
            <Button variant='danger' onClick={handleLogOut}>
              Kijelentkezés
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
