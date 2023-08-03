import { GlobalStateContext } from "./Global_Context";
import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";

const GlobalMethodsContext = createContext();

const GlobalMethodsProvider = ({ children }) => {
  const { user, token, setToken, setUser, setContactList } =
    useContext(GlobalStateContext);

  // Load token and user data from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setToken, setUser]);

  // Update local storage whenever token or user changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const SignIn = async (values) => {
    try {
      const url = "https://contacthub-backend.onrender.com/api/user/login";
      const response = await axios({
        method: "POST",
        url,
        data: values,
      });

      setToken(response.data.access_token);
      setUser(response.data.user);
      const params = response.data.access_token;
      await getAllContacts(params);
      return response;
    } catch (error) {
      return 401;
    }
  };

  const SignUp = async (values) => {
    try {
      const url = "https://contacthub-backend.onrender.com/api/user/register";
      const response = await axios({
        method: "POST",
        url,
        data: values,
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 400; // Customize this condition as needed
        },
      });

      return response;
    } catch (error) {
      return error.message;
    }
  };

  const updateUser = async (values) => {
    try {
      const url = `https://contacthub-backend.onrender.com/api/user/${user._id}`;
      const response = await axios({
        method: "PUT",
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 401; // Customize this condition as needed
        },
      });

      if (response.status === 200) setUser(response.data);

      return response;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getAllContacts = async (params) => {
    try {
      const url = `https://contacthub-backend.onrender.com/api/contacts`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${params}`,
        },
      });

      setContactList(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const addContact = async (values) => {
    try {
      const url = "https://contacthub-backend.onrender.com/api/contacts";
      const response = await axios({
        method: "POST",
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 400; // Customize this condition as needed
        },
      });

      await getAllContacts(token);

      return response;
    } catch (error) {
      return error.message;
    }
  };

  const updateContact = async (param) => {
    try {
      const url = `https://contacthub-backend.onrender.com/api/contacts/${param.id}`;
      const response = await axios({
        method: "PUT",
        url,
        data: param.values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 404; // Customize this condition as needed
        },
      });

      await getAllContacts(token);

      return response;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  const deleteContact = async (param) => {
    try {
      const url = `https://contacthub-backend.onrender.com/api/contacts/${param}`;
      const response = await axios({
        method: "DELETE",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 404; // Customize this condition as needed
        },
      });

      await getAllContacts(token);

      return response;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  const clearAllData = () => {
    setToken("");
    setUser("");
    setContactList("");
  };
  return (
    <GlobalMethodsContext.Provider
      value={{
        clearAllData,
        SignIn,
        SignUp,
        updateUser,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </GlobalMethodsContext.Provider>
  );
};
export { GlobalMethodsContext, GlobalMethodsProvider };
