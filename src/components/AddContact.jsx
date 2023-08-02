import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import { contactSchema } from "../schemas/schemas";
import "../styles/Contacts/AddContact.css";

// import { GlobalStateContext } from "../Context/Global_Context";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { GrMail } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { ImMobile } from "react-icons/im";
import { MdCancel } from "react-icons/md";

import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../Context/Global_Context";

const AddContact = ({ goBack }) => {
  const { addContact } = useContext(GlobalMethodsContext);
  const { setReload } = useContext(GlobalStateContext);
  // const navigate = useNavigate();
  const categoryList = {
    name: ["", "Friend", "Family", "Colleague", "Others"],
    // Add other properties here if needed
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    console.log("ok");
    console.log(JSON.stringify(values));

    const res = await addContact(values);
    console.log(res);

    if (res.status === 201) {
      goBack();
      actions.resetForm();
    } else if (res.status === 400) {
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
      name: "",
      email: "",
      phone: "",
      category: "",
    },
    validationSchema: contactSchema,
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
            <select
              id="category" // Note the correct spelling of 'category'
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              {categoryList.name.map((category) => {
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
            Add Contact
          </button>
          <ToastContainer />
          <MdCancel
            size={40}
            className="icon-center"
            onClick={() => {
              setReload(true);
              goBack();
              console.log("yes");
            }}
          />
        </form>
      </div>
    </>
  );
};

export default AddContact;
