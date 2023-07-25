import React, { useState } from "react";
import "../styles/Home.css";
import demo from "../assets/demo.webp";
import { BsSearch } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";

import EditContact from "../components/EditContact";
import UpdateUser from "../components/UpdateUser";
import ViewContact from "../components/ViewContact";
import AddContact from "../components/AddContact";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [Page, setPage] = useState("");
  const [show, setShow] = useState(true);

  const handleButtonClick = (param) => {
    setPage(param);
    setShow(false);
  };

  const handleGoBack = () => {
    setPage(""); // Reset the page to the initial state
    setShow(true); // Show the contact details section
  };

  const handleDeleteButton = () => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this contact?</p>
        <div className="toast-button">
          <button
            className="toast-button-yes"
            onClick={() => {
              // Perform the delete operation here
              console.log("Contact deleted!");
              // Close the toast
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="toast-button-no"
            onClick={() => {
              // Close the toast
              toast.dismiss();
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        // autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="user-container">
      <div className="user-profile">
        <div className="profile-image">
          <img className="image" src={demo} alt="profile" />
        </div>
        <div className="user-info">
          <p>Name : Imran Mir</p>
          <p>Email: imranmir6677@gmail.com</p>
          <p>Phone : 01111111111</p>
          <p>Total Contacts : 10</p>
        </div>

        {/* button */}
        <div className="user-button">
          <button
            className="button"
            onClick={() => handleButtonClick("Update User")}
          >
            Update Profile
          </button>
        </div>
      </div>
      <div className="vertical-line"></div>

      {/*  */}
      {show ? (
        <div className="contact-details">
          <div className="search-bar-with-add">
            {/* <button className=""> */}
            <BsPersonFillAdd
              color="rgb(132, 5, 182)"
              size={35}
              className="add"
              onClick={() => {
                handleButtonClick("Add Contact");
              }}
            />
            {/* </button> */}
            <div className="search-bar">
              <div className="input-container search-input">
                <input
                  //   value={values.email}
                  //   onChange={handleChange}
                  //   id="email"
                  //   type="email"
                  placeholder="Search contact..."
                  //   onBlur={handleBlur}
                  //   className={errors.email && touched.email ? "input-error" : ""}
                />
              </div>
              <button className="search-button">
                <BsSearch color="white" /> Search
              </button>
            </div>
          </div>

          <div className="contacts-container">
            <div className="contact">
              <div className="contact-img">
                <img className="img" src={demo} alt="profile" />
              </div>
              <div className="contact-info">
                <p>Name : Rafi Hasan</p>
                <p>Phone : 01866078475</p>
                <p>Email : rafihasan@gmail.com</p>
              </div>
              <div className="contact-options">
                <div className="view">
                  <BsFillEyeFill size={20} color="white" />
                </div>
                <div className="edit">
                  <FaEdit size={20} color="white" />
                </div>
                <div className="delete">
                  <MdDelete size={20} color="white" />
                </div>
              </div>
            </div>

            <div className="contact">
              <div className="contact-img">
                <img className="img" src={demo} alt="profile" />
              </div>
              <div className="contact-info">
                <p>Name : Rafi Hasan</p>
                <p>Phone : 01866078475</p>
                <p>Email : rafihasan@gmail.com</p>
              </div>
              <div className="contact-options">
                <div className="view">
                  <BsFillEyeFill size={20} color="white" />
                </div>
                <div className="edit">
                  <FaEdit size={20} color="white" />
                </div>
                <div className="delete">
                  <MdDelete size={20} color="white" />
                </div>
              </div>
            </div>

            <div className="contact">
              <div className="contact-img">
                <img className="img" src={demo} alt="profile" />
              </div>
              <div className="contact-info">
                <p>Name : Rafi Hasan</p>
                <p>Phone : 01866078475</p>
                <p>Email : rafihasan@gmail.com</p>
              </div>
              <div className="contact-options">
                <div className="view">
                  <BsFillEyeFill
                    size={20}
                    color="white"
                    onClick={() => handleButtonClick("View Contact")}
                  />
                </div>
                <div className="edit">
                  <FaEdit
                    size={20}
                    color="white"
                    onClick={() => handleButtonClick("Edit Contact")}
                  />
                </div>
                <div className="delete">
                  <MdDelete
                    size={20}
                    color="white"
                    onClick={() => handleDeleteButton()}
                  />
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="contact-details">
            {Page === "Update User" && <UpdateUser goBack={handleGoBack} />}
            {Page === "Add Contact" && <AddContact goBack={handleGoBack} />}
            {Page === "View Contact" && <ViewContact goBack={handleGoBack} />}
            {Page === "Edit Contact" && <EditContact goBack={handleGoBack} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
