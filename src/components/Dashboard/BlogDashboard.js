import React from "react";
import CardDashboard from "./CardDashboard";
import { useState, useEffect } from "react";
import { baseUrl } from "../config";

function BlogDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/posts/read`)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setPosts(res.data);
        }
      });
  }, []);
  return (
    <section className="section-two">
      <div className="vertical-container">
        {posts.length > 0 ? (
          posts.map((blog) => <CardDashboard key={blog.id} cardData={blog} />)
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </section>
  );
}

export default BlogDashboard;
