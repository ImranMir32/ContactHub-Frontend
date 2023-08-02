// import { BsFillEyeFill } from "react-icons/bs";
// import { FaEdit } from "react-icons/fa";
import demo from "../assets/demo.webp";
import "../styles/Contacts/ViewContact.css";
// import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import React from "react";
const ViewContact = ({ goBack, contact }) => {
  return (
    <div className="view_">
      <div className="view-container">
        <div className="view-profile">
          <div className="view-image">
            <img className="view-img" src={demo} alt="profile" />
          </div>
          <div className="view-info">
            <p>Name : {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Phone : {contact.phone}</p>
            <p>Category : {contact.category}</p>
            {/* <p>Total Contacts : 10</p> */}
          </div>
          <MdCancel
            size={40}
            className="icon-center"
            color="rgb(132, 5, 182)"
            onClick={() => {
              goBack();
              console.log("yes");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
