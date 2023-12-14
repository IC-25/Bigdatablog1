import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// variable link for api
import { baseUrl } from "../config";

// import Toast component

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Comment() {
  const { _id } = useParams();
  // const [post, setPost] = useState({});
  const [comment, setComments] = useState([]);
  const [commentMessage, setcommentMessage] = useState("");
  // const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  console.log("Token =", token);
  console.log("comment message: ", commentMessage);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts/read/${_id}`);

        if (response.ok) {
          const data = await response.json();
          // setPost(data.data);
          setComments(data.data.comment || []);
        } else {
          console.log("Failed to fetch post data");
        }
      } catch (error) {
        console.log("Error fetching post data: " + error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("commentMessage", commentMessage);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    console.log("token", token);

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      fetch(`${baseUrl}/posts/comment/send/${_id}`, {
        method: "POST",
        headers: headers,
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            setcommentMessage("");
            console.log("blog added");
            toast("Comment added successfully");
            return response.json();
          } else {
            console.error("Request failed with status:", response.status);
            toast("Request failed with status:", response.status);
          }
        })
        .catch((error) => {
          toast("Fetch error:", error);
        });
    } else {
      toast("You are not login. Please log in before add comment.");
    }
  };

  return (
    <div className="contactForm-container">
      <div className="contactForm-content">
        <form onSubmit={handleSubmit}>
          <h2>// LEAVE COMMENT //</h2>
          <textarea
            type="text"
            value={commentMessage}
            onChange={(e) => {
              setcommentMessage(e.target.value);
            }}
            placeholder="Add your comment..."
          />
          <div className="send-button">
            <button type="submit">POST COMMENT</button>
          </div>
        </form>
        <h2>// COMMENTS //</h2>
        <div className="comment-container">
          {comment.map((comments, index) => (
            <div key={index} className="comment">
              <div className="comment-content">
                <div className="comment-header">
                  <h4>{comments.username}</h4>
                  <div className="comment-message">
                    <p>{comments.commentMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Comment;
