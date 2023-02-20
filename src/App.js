import './App.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'
import NewForm from './components/NewForm'
import Results from './components/Results'
import Members from './components/Members'
import Success from './components/Success'
import BtqPage from './components/BtqPage'
import NewFormDatabase from './components/NewFormDatabase'
import MemberResults from './components/member results components/memberResults.component'
import { UserAuthContextProvider } from './context/UserAuthContext'
import 'bootstrap/dist/css/bootstrap.css'
import NavbarComponent from './components/navbar/NavbarComponent'

function App() {
  return (
    <Container>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/new-form'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <NewForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/new_form_database'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <NewFormDatabase />
              </ProtectedRoute>
            }
          />
          <Route
            path='/success'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <Success />
              </ProtectedRoute>
            }
          />
          <Route
            path='/results'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path='/members'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <Members />
              </ProtectedRoute>
            }
          />

          <Route
            path='/results/:route'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <BtqPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/results/:route/:uuid'
            element={
              <ProtectedRoute>
                <NavbarComponent />
                <MemberResults />
              </ProtectedRoute>
            }
          />

          <Route path='/' element={<Login />} />

          <Route path='/signup' element={<SignUp />} />

          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<div>Ez az oldal nem található</div>} />
        </Routes>
      </UserAuthContextProvider>
    </Container>
  )
}

export default App
