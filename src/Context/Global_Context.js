import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [contactList, setContactList] = useState([]);
  const [reload, setReload] = useState(false);
  return (
    <GlobalStateContext.Provider
      value={{
        user,
        token,
        contactList,
        reload,
        setUser,
        setToken,
        setContactList,
        setReload,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
