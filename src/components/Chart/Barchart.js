import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const apiUrlPosts = "https://my-first-blog-apis.onrender.com/api/posts/read";
const apiUrlUsers = "https://my-first-blog-apis.onrender.com/api/users/view";

const token = localStorage.getItem("token");

function Barchart() {
  const [Data, setData] = useState({
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
          commentsCount += post.comment.length;
          viewsCount += post.views;
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

  const data = [
    {
      name: "Users",
      value: Data.userCount,
    },
    {
      name: "Posts",
      value: Data.postCount,
    },
    {
      name: "Views",
      value: Data.viewCount,
    },
    {
      name: "Comments",
      value: Data.commentCount,
    },
  ];

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <div className="graphic-chart">
          <BarChart
            width={400}
            height={330}
            data={data}
            margin={{
              top: 10,
              right: 30,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#7F0101" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
      </ResponsiveContainer>
    </div>
  );
}

export default Barchart;
