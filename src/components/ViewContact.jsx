import React, { useState, useEffect } from "react";
import axios from "axios";
import demo from "../assets/demo.webp";
import "../styles/Contacts/ViewContact.css";
import { MdCancel } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewContact = ({ goBack, contact }) => {
  const [imageURL, setImageURL] = useState(demo);

  // All about image upload
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/image/${contact._id}`)
      .then((res) => {
        console.log("data--->", res.data);
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(res.data.img.data.data))
        );
        console.log(res.data.img.data.data);

        setImageURL(`data:image/png;base64,${base64String}`);
      })
      .catch((err) => console.log(err, "it has an error"));
  }, [contact._id]);

  // const { imgUpload } = useContext(GlobalMethodsContext);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageURL(e.target.result);
    };

    if (file) {
      const fileSizeInKB = Math.round(file.size / 1024); // Convert bytes to KB
      if (fileSizeInKB > 70) {
        toast.warning(`Image resolution is to high`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      console.log(`File size: ${fileSizeInKB} KB`);
    }

    if (imageURL === demo) {
      const user_id = contact._id;
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
        toast.success(`Image uploaded successfully`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setUploadStatus("Image uploaded successfully");
      } catch (error) {
        console.error(error);
        toast.warning(`${error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setUploadStatus("Error uploading image");
      }
    } else {
      const user_id = contact._id;
      const formData = new FormData();
      formData.append("testImage", file);
      try {
        const response = await axios.put(
          `http://localhost:4000/api/image/${user_id}`,
          formData
        );
        console.log(response.data);
        toast.success(`Image uploaded successfully`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setUploadStatus("Image uploaded successfully");
      } catch (error) {
        console.error(error);
        toast.warning(`${error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setUploadStatus("Error uploading image");
      }
    }

    reader.readAsDataURL(file);
  };

  return (
    <div className="view_">
      <div className="view-container">
        <div className="view-profile">
          <div className="view-image">
            <img className="view-img" src={imageURL} alt="profile" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-contact"
            />
            <ToastContainer />
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
