import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import { GlobalStateContext } from "../Context/Global_Context";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
const Home = () => {
  const { user, contactList, reload } = useContext(GlobalStateContext);
  const { clearAllData, deleteContact } = useContext(GlobalMethodsContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [reload]);

  const [Page, setPage] = useState("");
  const [show, setShow] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactTo, setContactTo] = useState({});
  const [imageURL, setImageURL] = useState(demo);

  const navigate = useNavigate();
  // console.log("array--->", contactList);

  // functions
  const handleExitButton = () => {
    clearAllData();
    navigate("/");
  };

  // Search Query
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state as the user types
  };
  const filteredContacts = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Change page
  const handleButtonClick = (param) => {
    setPage(param.info);
    setContactTo(param.contact);
    setShow(false);
  };

  // retun to home
  const handleGoBack = () => {
    setPage(""); // Reset the page to the initial state
    setShow(true); // Show the contact details section
  };

  // Delete msg
  const handleDeleteButton = async (contact) => {
    console.log(contact);
    toast.info(
      <div>
        <p>Are you sure you want to delete this contact?</p>
        <div className="toast-button">
          <button
            className="toast-button-yes"
            onClick={async () => {
              // Perform the delete operation here
              const res = await deleteContact(contact._id);
              console.log("Contact deleted!", res);
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

  // All about image upload
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/image/${user._id}`)
      .then((res) => {
        console.log("data--->", res.data);
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(res.data.img.data.data))
        );
        console.log(res.data.img.data.data);

        setImageURL(`data:image/png;base64,${base64String}`);
      })
      .catch((err) => console.log(err, "it has an error"));
  }, [user._id]);

  // const { imgUpload } = useContext(GlobalMethodsContext);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageURL(e.target.result);
    };

    // const selectedFile=event.target.value;

    if (imageURL === demo) {
      const user_id = user._id;
      console.log(user_id);
      const formData = new FormData();
      formData.append("testImage", file);
      formData.append("user_id", user_id);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/image/upload",
          formData
        );
        console.log(response.data);
        // setUploadStatus("Image uploaded successfully");
      } catch (error) {
        console.error(error);
        // setUploadStatus("Error uploading image");
      }
    } else {
      const user_id = user._id;
      const formData = new FormData();
      formData.append("testImage", file);
      try {
        const response = await axios.put(
          `http://localhost:4000/api/image/${user_id}`,
          formData
        );
        console.log(response.data);
        // setUploadStatus("Image uploaded successfully");
      } catch (error) {
        console.error(error);
        // setUploadStatus("Error uploading image");
      }
    }

    reader.readAsDataURL(file);
  };

  return (
    <div className="user-container">
      <div className="user-profile">
        <button className="button-exit" onClick={() => handleExitButton()}>
          <BiLogOut color="white" size={20} />
          Log Out
        </button>
        <div className="profile-image">
          <img className="image" src={imageURL} alt="profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload"
          />
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
            onClick={() =>
              handleButtonClick({ contact: {}, info: "Update User" })
            }
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
                handleButtonClick({ contact: {}, info: "Add Contact" });
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
                {/* <div className="contact-img">
                  <img className="img" src={demo} alt="profile" />
                </div> */}
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
                      onClick={() =>
                        handleButtonClick({ contact, info: "View Contact" })
                      }
                    />
                  </div>
                  <div className="edit">
                    <FaEdit
                      size={20}
                      color="white"
                      onClick={() =>
                        handleButtonClick({ contact, info: "Edit Contact" })
                      }
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
            {Page === "View Contact" && (
              <ViewContact goBack={handleGoBack} contact={contactTo} />
            )}
            {Page === "Edit Contact" && (
              <EditContact goBack={handleGoBack} contact={contactTo} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
