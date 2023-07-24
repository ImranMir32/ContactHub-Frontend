import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signInSchema } from "../schemas/schemas";
import { Link } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import { GlobalStateContext } from "../Context/Global_Context";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { GrMail } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit,
  });

  console.log(errors);
  return (
    <>
      <main class="main">
        <div className="container">
          <div class="form-container">
            <h1 className="header">ContactHub</h1>
            {/* <h1 className="header-text">Login</h1> */}
            <form class="form" onSubmit={handleSubmit} autoComplete="off">
              {/* email */}

              <div className="input-container">
                <GrMail size={20} className="icon" />
                <input
                  value={values.email}
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "input-error" : ""}
                />
              </div>
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}

              {/* password */}
              <div className="input-container">
                <RiLockPasswordLine size={22} className="icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
                Login
              </button>
              {/* <ToastContainer /> */}

              {/* login  */}
              <div className="form-info">
                Don't have an account?{" "}
                <Link to="/signup" className="link">
                  Signup
                </Link>{" "}
                instead.
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignInForm;
