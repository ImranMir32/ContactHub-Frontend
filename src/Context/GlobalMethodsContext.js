import { GlobalStateContext } from "./Global_Context";
import React, { createContext, useContext } from "react";
import axios from "axios";

const GlobalMethodsContext = createContext();

const GlobalMethodsProvider = ({ children }) => {
  const { user, token, setToken, setUser, setContactList } =
    useContext(GlobalStateContext);

  const SignIn = async (values) => {
    console.log("values----", values);
    try {
      const url = "http://localhost:4000/api/user/login";
      const response = await axios({
        method: "POST",
        url,
        data: values,
      });
      console.log("name: ", response);
      setToken(response.data.access_token);
      setUser(response.data.user);
      const params = response.data.access_token;
      await getAllContacts(params);
      return response;
    } catch (error) {
      console.log(error.message);
      return 401;
    }
  };

  const SignUp = async (values) => {
    console.log("-->", values);
    try {
      const url = "http://localhost:4000/api/user/register";
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
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  const updateUser = async (values) => {
    try {
      console.log("-->", user._id);
      const url = `http://localhost:4000/api/user/${user._id}`;
      const response = await axios({
        method: "PUT",
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setUser(response.data);
      // setUserName(response.data.name);
      return response;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getAllContacts = async (params) => {
    try {
      console.log("va-", params);
      const url = `http://localhost:4000/api/contacts`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${params}`,
        },
      });

      console.log("contacts----->", response.data.length);
      setContactList(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const addContact = async (values) => {
    console.log("-->", values);
    try {
      const url = "http://localhost:4000/api/contacts";
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
      console.log({ token });
      await getAllContacts(token);

      return response;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  //   const imgUpload = async (values) => {
  //     try {
  //       await axios.post("http://localhost:4000/api/image/upload", values, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("Image uploaded successfully");
  //     } catch (error) {
  //       console.log(error.message);
  //       return 401;
  //     }
  //   };

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
        // imgUpload,
        updateUser,
        addContact,
      }}
    >
      {children}
    </GlobalMethodsContext.Provider>
  );
};
export { GlobalMethodsContext, GlobalMethodsProvider };
