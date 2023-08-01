import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [conactList, setContactList] = useState({});
  return (
    <GlobalStateContext.Provider
      value={{
        user,
        token,
        conactList,
        setUser,
        setToken,
        setContactList,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
