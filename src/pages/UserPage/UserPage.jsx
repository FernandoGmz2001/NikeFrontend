import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@nextui-org/react";

function UserPage() {
  const [redirect, setRedirect] = useState(false);

  function closeSession() {
    localStorage.removeItem("token");
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>UserPage</h1>
      <Button onClick={closeSession}>Close session</Button>
    </div>
  );
}

export default UserPage;
