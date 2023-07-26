import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [conact, setContact] = useState({});
  return (
    <GlobalStateContext.Provider
      value={{
        user,
        token,
        conact,
        setUser,
        setToken,
        setContact,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
