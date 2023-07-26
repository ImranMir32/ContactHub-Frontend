import { GlobalStateContext } from "./Global_Context";
import React, { createContext, useContext } from "react";
import axios from "axios";

const GlobalMethodsContext = createContext();

const GlobalMethodsProvider = ({ children }) => {
  // const { setToken, setUser } = useContext(GlobalStateContext);

  //   const SignIn = async (values) => {
  //     try {
  //       const url = "http://localhost:4000/api/users/login";
  //       const response = await axios({
  //         method: "POST",
  //         url,
  //         data: values,
  //       });
  //       //   console.log("name: ", response.data.access_token);
  //       setUserName(response.data.user.name);
  //       setToken(response.data.access_token);
  //       setUser(response.data.user);
  //       return response.status;
  //     } catch (error) {
  //       console.log(error.message);
  //       return 401;
  //     }
  //   };

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

  //   const updateUser = async (values) => {
  //     try {
  //       const url = `http://localhost:4000/api/users/update/${user.email}`;
  //       const response = await axios({
  //         method: "PUT",
  //         url,
  //         data: values,
  //       });

  //       console.log(response.data);
  //       setUser(response.data);
  //       setUserName(response.data.name);
  //       return response.status;
  //     } catch (error) {
  //       console.log(error.message);
  //       return 500;
  //     }
  //   };

  //   const clearAllData = () => {
  //     setUserName("");
  //     setToken("");
  //     setUser("");
  //   };
  return (
    <GlobalMethodsContext.Provider
      value={{
        // clearAllData,
        // SignIn,
        SignUp,
        // imgUpload,
        // updateUser,
      }}
    >
      {children}
    </GlobalMethodsContext.Provider>
  );
};
export { GlobalMethodsContext, GlobalMethodsProvider };
