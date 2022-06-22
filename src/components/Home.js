import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";

export default function Home() {
  const { user, logOut } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      
    }
  }

  return (
    <>
      <div>{user && user.email}</div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogOut}>
          Kijelentkezés
        </Button>
      </div>
    </>
  );
}
