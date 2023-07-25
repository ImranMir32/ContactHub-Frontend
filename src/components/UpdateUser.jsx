import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "../schemas/schemas";
import "../styles/Contacts/AddContact.css";

// import { GlobalStateContext } from "../Context/Global_Context";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { GrMail } from "react-icons/gr";
import { BiSolidUser } from "react-icons/bi";
import { ImMobile } from "react-icons/im";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const UpdateUser = ({ goBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
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

          {/* password */}
          <div className="input-container">
            <RiLockPasswordLine size={22} className="icon" />
            <input
              id="new_password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.new_password && touched.new_password ? "input-error" : ""
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
          {errors.new_password && touched.new_password && (
            <p className="error">{errors.new_assword}</p>
          )}

          {/* password */}
          <div className="input-container">
            <RiLockPasswordLine size={22} className="icon" />
            <input
              id="password"
              type={showPassword2 ? "text" : "password"}
              placeholder="Enter your current password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            {showPassword2 ? (
              <BsFillEyeFill
                size={20}
                className="icon-right"
                color="rgb(24, 188, 230)"
                onClick={togglePasswordVisibility2}
              />
            ) : (
              <BsFillEyeSlashFill
                size={20}
                className="icon-right"
                color="rgb(24, 188, 230)"
                onClick={togglePasswordVisibility2}
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

export default UpdateUser;
