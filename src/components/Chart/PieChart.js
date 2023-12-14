import React, { PureComponent, useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const apiUrlPosts = "https://my-first-blog-apis.onrender.com/api/posts/read";
const apiUrlUsers = "https://my-first-blog-apis.onrender.com/api/users/view";

const token = localStorage.getItem("token");

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PieChartComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([
    { name: "Users", value: 0 },
    { name: "Post", value: 0 },
    { name: "Comments", value: 0 },
    { name: "Views", value: 0 },
  ]);

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
        setData((prevData) => [
          ...prevData,
          { name: "Post", value: postsCount },
          { name: "Views", value: viewsCount },
          { name: "Comments", value: commentsCount },
        ]);
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
        setData((prevData) => [
          { name: "Users", value: userCount },
          ...prevData,
        ]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#7F0101"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
