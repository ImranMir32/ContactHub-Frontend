import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";
import demo from "../assets/demo.webp";
import { BsSearch, BsPersonFillAdd, BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

import EditContact from "../components/EditContact";
import UpdateUser from "../components/UpdateUser";
import ViewContact from "../components/ViewContact";
import AddContact from "../components/AddContact";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStateContext } from "../Context/Global_Context";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
const Home = () => {
  const [Page, setPage] = useState("");
  const [show, setShow] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useContext(GlobalStateContext);
  const { clearAllData } = useContext(GlobalMethodsContext);
  const navigate = useNavigate();
  const contactList = [
    {
      img: { demo },
      name: "imlim",
      email: "imranmir@gmail.com",
      phone: "01945545488",
    },
    {
      img: { demo },
      name: "imran",
      email: "imranmir@gmail.com",
      phone: "01945545488",
    },
    {
      img: { demo },
      name: "ilish",
      email: "imranmir@gmail.com",
      phone: "01945545488",
    },
  ];

  // functions
  const handleExitButton = () => {
    clearAllData();
    navigate("/");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state as the user types
  };

  const filteredContacts = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleButtonClick = (param) => {
    setPage(param);
    setShow(false);
  };

  const handleGoBack = () => {
    setPage(""); // Reset the page to the initial state
    setShow(true); // Show the contact details section
  };

  const handleDeleteButton = (contact) => {
    console.log(contact);
    toast.info(
      <div>
        <p>Are you sure you want to delete this contact?</p>
        <div className="toast-button">
          <button
            className="toast-button-yes"
            onClick={() => {
              // Perform the delete operation here
              console.log("Contact deleted!", contact.name);
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
        <button className="button-exit" onClick={() => handleExitButton()}>
          <BiLogOut color="white" size={20} />
          Log Out
        </button>
        <div className="profile-image">
          <img className="image" src={demo} alt="profile" />
        </div>
        <div className="user-info">
          <p>Name : {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone : {user.phone}</p>
          <p>Total Contacts : {contactList.length}</p>
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
                  type="text"
                  placeholder="Search contact..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              <button className="search-button">
                <BsSearch color="white" /> Search
              </button>
            </div>
          </div>

          <div className="contacts-container">
            {/* map */}
            {filteredContacts.map((contact) => (
              <div className="contact" key={contact.name}>
                <div className="contact-img">
                  <img className="img" src={demo} alt="profile" />
                </div>
                <div className="contact-info">
                  <p>Name : {contact.name}</p>
                  <p>Phone : {contact.phone}</p>
                  <p>Email : {contact.email}</p>
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
                      onClick={() => handleDeleteButton(contact)}
                    />
                    <ToastContainer closeButton={false} />
                  </div>
                </div>
              </div>
            ))}
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
