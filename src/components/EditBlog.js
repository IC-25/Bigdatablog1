import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { baseUrl } from "../components/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ setOpenModal }) {
  const [PostTitle, setTitle] = useState("");
  const [PostImage, setImage] = useState("");
  const [PostContent, setContent] = useState("");

  const identity = localStorage.getItem("id");
  const [singlez, setSingle] = useState({});
  console.log("All Singlez:  ", singlez);

  const token = localStorage.getItem("token");

  console.log("Token =", token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    // fetching data for single blog
    const singleBlog = async () => {
      console.log("identity", identity);
      const all = await axios.get(`${baseUrl}/posts/read/${identity}`);

      const result = all.data.data;

      setSingle(result);
    };
    singleBlog();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const imageInput = document.getElementById("imageInput");
    const PostImage = imageInput.files[0];

    const formData = new FormData();
    formData.append("PostTitle", PostTitle);
    formData.append("PostImage", PostImage);
    formData.append("PostContent", PostContent);

    try {
      const response = await axios.put(
        `${baseUrl}/posts/update/${identity}`,
        formData,
        config
      );

      console.log(response);

      if (response.status === 201) {
        toast("Blog has been updated successfully!");
        window.location.reload();
      } else {
        toast("Failed to update the blog.");
      }
    } catch (error) {
      console.error(error);
      toast("Failed to update the blog.");
    }
  };

  return (
    <div className="modalBackgroundEdit">
      <div className="modalContainer">
        <div className="edit-container">
          <div className="edit-content">
            <div className="add-new-header">
              <h4>Edit Blog</h4>
              <div className="CloseBtn">
                <FontAwesomeIcon
                  icon={faTimes}
                  className="close-icon edit-close"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                />
              </div>
            </div>
            <div className="add-new-form">
              <form action="">
                <div className="input-image">
                  <input
                    type="file"
                    name="image"
                    id="imageInput"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="input-title">
                  <input
                    type="text"
                    name="title"
                    value={PostTitle ? PostTitle : singlez.PostTitle}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="input-content">
                  <textarea
                    name="content"
                    placeholder="Content"
                    value={PostContent ? PostContent : singlez.PostContent}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="add-new-btn add">
                  <button onClick={handleUpdate}>
                    <p>Save</p>
                    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Modal;
