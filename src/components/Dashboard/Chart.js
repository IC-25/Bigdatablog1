import React, { useState, useEffect } from "react";
import DashboardNavBar from "./DashboardNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComment,
  faEye,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const apiUrlPosts = "https://my-first-blog-apis.onrender.com/api/posts/read";
const apiUrlUsers = "https://my-first-blog-apis.onrender.com/api/users/view";

const token = localStorage.getItem("token");

console.log("Token =", token);

function Chart() {
  const [data, setData] = useState({
    userCount: 0,
    postCount: 0,
    viewCount: 0,
    commentCount: 0,
  });

  useEffect(() => {
    // Fetch posts data
    fetch(apiUrlPosts)
      .then((response) => response.json())
      .then((postData) => {
        const posts = postData.data;
        const postsCount = posts.length;

        let commentsCount = 0;
        let viewsCount = 0;

        // Loop through the posts to count comments and views
        posts.forEach((post) => {
          commentsCount += post?.comment?.length;
          viewsCount += post?.views;
        });

        // Update the data state with post counts
        setData((prevData) => ({
          ...prevData,
          postCount: postsCount,
          viewCount: viewsCount,
          commentCount: commentsCount,
        }));
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });

    // Fetch users data to count users
    fetch(apiUrlUsers, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include your authentication token here
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        const userCount = userData.data.length;

        // Update the data state with user count
        setData((prevData) => ({
          ...prevData,
          userCount,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
      <DashboardNavBar />
      <section className="section-two">
        <div className="main-container">
          <div className="main-title">
            <h2>VIEW DASHBOARD</h2>
          </div>

          <div className="main-cards">
            <div className="card">
              <div className="card-inner">
                <h2>Users</h2>
                <h1>
                  <FontAwesomeIcon icon={faUser} className="card-icon" />
                </h1>
              </div>
              <h1>{data.userCount}</h1>
            </div>

            <div className="card">
              <div className="card-inner">
                <h2>Posts</h2>
                <h1>
                  <FontAwesomeIcon icon={faNewspaper} className="card-icon" />
                </h1>
              </div>
              <h1>{data.postCount}</h1>
            </div>

            <div className="card">
              <div className="card-inner">
                <h2>Views</h2>
                <h1>
                  <FontAwesomeIcon icon={faEye} className="card-icon" />
                </h1>
              </div>
              <h1>{data.viewCount}</h1>
            </div>

            <div className="card">
              <div className="card-inner">
                <h2>Comments</h2>
                <h1>
                  <FontAwesomeIcon icon={faComment} className="card-icon" />
                </h1>
              </div>
              <h1>{data.commentCount}</h1>
            </div>
          </div>
          <div className="graphic-chart"></div>
        </div>
      </section>
    </>
  );
}

export default Chart;
