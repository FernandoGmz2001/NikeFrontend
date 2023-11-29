import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Navbar from "../../components/Navbar/Navbar";

function UserPage() {
  const [redirect, setRedirect] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  function closeSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="wrapper">
        <h1>UserPage</h1>
        <h2>{userData.userEmail}</h2>
        <Button onClick={closeSession}>Close session</Button>
        {
          token && (
            <Link to={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          )
        }
        {/* <Link to={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link> */}
      </div>
    </div>
  );
}

export default UserPage;
