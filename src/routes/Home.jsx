import React from "react";
import "../styles/Home.css";
import demo from "../assets/demo.webp";
import { BsSearch } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

const Home = () => {
  //   const [Page, setPage] = useState("Account Request");

  //   const handleButtonClick = (param) => {
  //     setPage(param);
  //   };

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
          <button className="button">Update Profile</button>
        </div>
      </div>
      <div className="vertical-line"></div>
      <div className="contact-details">
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

        <div className="contacts-container">
          <div className="contact">
            <div className="contact-img">
              <img className="img" src={demo} alt="profile" />
            </div>
            <div className="contact-info">
              <p>Name : Rafi Hasan</p>
              <p>Phone : 01866078475</p>
              <p className="corner">Email : rafihasan@gmail.com</p>
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
        </div>
        <div className="contacts-container">
          <div className="contact">
            <div className="contact-img">
              <img className="img" src={demo} alt="profile" />
            </div>
            <div className="contact-info">
              <p>Name : Rafi Hasan</p>
              <p>Phone : 01866078475</p>
              <p className="corner">Email : rafihasan@gmail.com</p>
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
        </div>
        <div className="contacts-container">
          <div className="contact">
            <div className="contact-img">
              <img className="img" src={demo} alt="profile" />
            </div>
            <div className="contact-info">
              <p>Name : Rafi Hasan</p>
              <p>Phone : 01866078475</p>
              <p className="corner">Email : rafihasan@gmail.com</p>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
