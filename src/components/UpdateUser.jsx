import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { updateUserSchema } from "../schemas/schemas";
import "../styles/Contacts/AddContact.css";

import { GrMail } from "react-icons/gr";
import { BiSolidUser } from "react-icons/bi";
import { ImMobile } from "react-icons/im";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStateContext } from "../Context/Global_Context";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";

const UpdateUser = ({ goBack }) => {
  const { user, setReload } = useContext(GlobalStateContext);
  const { updateUser } = useContext(GlobalMethodsContext);
  const [showPassword, setShowPassword] = useState(false);

  // functions
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    console.log("ok");
    console.log(JSON.stringify(values));
    const res = await updateUser(values);
    console.log("res--->", res);

    if (res.status === 200) {
      setReload(true);
      actions.resetForm();
      goBack();
    } else if (res.status === 401) {
      toast.warning(`${res.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.warning(`Network response was not ok`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
      name: `${user.name}`,
      email: `${user.email}`,
      phone: `${user.phone}`,
      password: "",
    },
    validationSchema: updateUserSchema,
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

          {/* password */}

          {/* password */}
          <div className="input-container">
            <RiLockPasswordLine size={22} className="icon" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            {showPassword ? (
              <BsFillEyeFill
                size={20}
                className="icon-right"
                color="rgb(24, 188, 230)"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <BsFillEyeSlashFill
                size={20}
                className="icon-right"
                color="rgb(24, 188, 230)"
                onClick={togglePasswordVisibility}
              />
            )}
            {/* <BsFillEyeSlashFill size={20} className="icon-right" /> */}
          </div>
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          {/* button */}
          <button disabled={isSubmitting} type="submit" class="button">
            Update Profile
          </button>
          <ToastContainer />
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

export default UpdateUser;
