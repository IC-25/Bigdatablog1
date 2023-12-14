import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar/NavBar";
import Comment from "./Dashboard/Comment";
import { baseUrl } from "../components/config";

function SingleBlog() {
  const { _id } = useParams();
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    fetch(`${baseUrl}/posts/read/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [_id]);

  console.log("POSTS", blogData);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="single-blog">
        <div className="single-card">
          <div className="card-image">
            <img src={blogData.PostImage} alt="image" />
          </div>
          <h2>{blogData.PostTitle}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: blogData.PostContent
                ? `${blogData.PostContent.substring(0, 150)}`
                : "",
            }}
          ></p>
          <p>
            By {blogData.creator} | {blogData.PostedDate}
          </p>
        </div>
      </div>
      <Comment />
    </>
  );
}

export default SingleBlog;
