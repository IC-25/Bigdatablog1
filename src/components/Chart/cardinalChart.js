import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { curveCardinal } from "d3-shape";

const apiUrlPosts = "https://my-first-blog-apis.onrender.com/api/posts/read";
const apiUrlUsers = "https://my-first-blog-apis.onrender.com/api/users/view";

const token = localStorage.getItem("token");

const cardinal = curveCardinal.tension(0.2);

function CardinalChart() {
  const [data, setData] = useState([
    {
      name: "Users",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Posts",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Views",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Comments",
      uv: 0,
      pv: 0,
      amt: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch posts data
      const postResponse = await fetch(apiUrlPosts);
      if (postResponse.ok) {
        const postData = await postResponse.json();
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
        setData((prevData) => [
          {
            ...prevData[0],
            uv: postsCount,
          },
          {
            ...prevData[1],
            uv: postsCount,
          },
          {
            ...prevData[2],
            uv: viewsCount,
          },
          {
            ...prevData[3],
            uv: commentsCount,
          },
        ]);
      } else {
        console.error("Error fetching post data");
      }

      // Fetch users data to count users
      const userResponse = await fetch(apiUrlUsers, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token here
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        const userCount = userData.data.length;

        // Update the data state with user count
        setData((prevData) => [
          {
            ...prevData[0],
            pv: userCount,
          },
          ...prevData.slice(1),
        ]);
      } else {
        console.error("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={400}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#7F0101"
            fill="#7F0101"
            fillOpacity={0.3}
          />
          <Area
            type={cardinal}
            dataKey="pv"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CardinalChart;
