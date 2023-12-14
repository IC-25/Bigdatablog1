import React, { useState } from "react";
import EditBlog from "../EditBlog";

// import toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardDashboard({ cardData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleDelete = () => {
    // Close the delete confirmation dialog
    setDeleteConfirmationOpen(false);

    const token = localStorage.getItem("token");

    if (!token) {
      toast("You are not authenticated. Please log in.");
      return;
    }

    fetch(
      `https://my-first-blog-apis.onrender.com/api/posts/delete/${cardData._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          toast("Blog deleted successfully!!");
        } else {
          console.error("Failed to delete the blog.");
        }
      })
      .catch((error) => {
        console.error("Error while deleting the blog:", error);
      });
  };

  return (
    <>
      {modalOpen && <EditBlog setOpenModal={setModalOpen} />}
      <div>
        <div className="vertical-content">
          <div className="vertical-card-image">
            <img src={cardData?.PostImage} alt="bruce image" />
          </div>
          <div className="vertical-right-side">
            <h3>{cardData?.PostTitle}</h3>
            <p className="description">
              {cardData?.PostContent?.substring(0, 200)}...
            </p>
            <div className="card-bottom-dashboard">
              <div className="vertical-card-date">
                <p>
                  <span>By {cardData?.creator}</span>
                  <span> | </span>
                  <span>{cardData?.PostedDate?.substring(0, 10)}</span>
                </p>
              </div>
              <div className="vertical-read-more">
                <button
                  className="action-btn edit"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="action-btn"
                  onClick={() => setDeleteConfirmationOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

      {/* Delete confirmation dialog */}
      {deleteConfirmationOpen && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this blog?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setDeleteConfirmationOpen(false)}>No</button>
        </div>
      )}
    </>
  );
}

export default CardDashboard;
