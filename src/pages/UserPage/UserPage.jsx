import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Navbar from "../../components/Navbar/Navbar";

function UserPage() {
  const [redirect, setRedirect] = useState(false);
  const username = localStorage.getItem("username");

  function closeSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="wrapper">
      <Navbar />
      <h1>UserPage</h1>
      <h2>{username}</h2>
      <Button onClick={closeSession}>Close session</Button>
      <Link to={"/dashboard"}>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}

export default UserPage;
