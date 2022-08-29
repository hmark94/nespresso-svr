import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NewForm from "./components/NewForm";
import Results from "./components/Results";
import Members from "./components/Members";
import Success from "./components/Success";
import MemberResults from "./components/member results components/memberResults.component";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "./components/navbar/NavbarComponent";

function App() {
  return (
    <Container>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-form"
            element={
              <ProtectedRoute>
                <NewForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results/memberResults"
            element={
              <>
                <NavbarComponent />
                <MemberResults />
              </>
            }
          />

          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
