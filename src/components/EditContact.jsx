import React, { useEffect } from "react";
import { useFormik } from "formik";
import { userSchema } from "../schemas/schemas";
import "../styles/Contacts/AddContact.css";

// import { GlobalStateContext } from "../Context/Global_Context";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { GrMail } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { ImMobile } from "react-icons/im";

import { MdCancel } from "react-icons/md";

const EditContact = ({ goBack }) => {
  const catagoryList = {
    name: ["", "Category 1", "Category 2", "Category 3"],
    // Add other properties here if needed
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    console.log("ok");
    console.log(JSON.stringify(values));

    // if (
    //   values.email === "uitsadmin@gmail.com" &&
    //   values.password === "uitsadmin"
    // )
    //   navigate("/admin-dashboard");

    // let result = await fetch("http://localhost:8000/api/v1/users/login", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // result = await result.json();
    // // console.log("result--> ", result.newUser);
    // actions.resetForm();

    // if (result.status === "success") {
    //   setUser(result.user);
    //   if (result.user.role === "teacher") navigate("/teacher-dashboard");
    //   else if (result.user.role === "driver") navigate("/driver-dashboard");
    // } else {
    //   toast.error("Wrong email or password !", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "Md. Imran",
      email: "imranmir@gmail.com",
      phone: "0186678475",
    },
    validationSchema: userSchema,
    onSubmit,
  });

  console.log(errors);
  return (
    <>
      <div class="form-container-3">
        <h1 className="header">ContactHub</h1>
        <form class="form" onSubmit={handleSubmit} autoComplete="off">
          {/* name */}
          <div className="input-container">
            <BiSolidUser size={20} className="icon" />
            <input
              value={values.name}
              onChange={handleChange}
              id="name"
              type="text"
              placeholder="Name"
              onBlur={handleBlur}
              className={errors.name && touched.name ? "input-error" : ""}
            />
          </div>
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}

          {/* email */}
          <div className="input-container">
            <GrMail size={20} className="icon" />
            <input
              value={values.email}
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="Email"
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
          </div>
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          {/* phone */}
          <div className="input-container">
            <ImMobile size={20} className="icon" />
            <input
              value={values.phone}
              onChange={handleChange}
              id="phone"
              type="text"
              placeholder="Phone number"
              onBlur={handleBlur}
              className={errors.phone && touched.phone ? "input-error" : ""}
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="error">{errors.phone}</p>
          )}

          <div className="input-container">
            <BiSolidCategoryAlt size={20} className="icon" />
            <select>
              {catagoryList.name.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          {/* button */}
          <button disabled={isSubmitting} type="submit" class="button">
            Update Contact
          </button>
          {/* <ToastContainer /> */}
          <MdCancel
            size={40}
            className="icon-center"
            onClick={() => {
              goBack();
              console.log("yes");
            }}
          />
        </form>
      </div>
    </>
  );
};

export default EditContact;
