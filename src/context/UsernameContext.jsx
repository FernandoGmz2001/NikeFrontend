import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const setLoggedInUser = (name) => {
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};