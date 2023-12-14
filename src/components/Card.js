import React from "react";
// import bruce from "../components/image/bruce.jpg";
import { Link } from "react-router-dom";

function Card({ cardData }) {
  const blogId = cardData._id; // Define and set the value of blogId
  return (
    <div className="vertical-content">
      <div className="card-image">
        <img src={cardData?.PostImage} alt="bruce image" />
      </div>
      <div className="vertical-right-side">
        <h3>{cardData?.PostTitle}</h3>
        <div className="line">
          <hr />
        </div>
        <div className="card-description">
          <p>{cardData?.PostContent?.substring(0, 100)}...</p>
        </div>
        <div className="card-bottom">
          <div className="card-date">
            <p>
              {/* <img src={cardData.creatorprofile} alt="profile" className='creatorProfile'/> */}
              <span>By {cardData?.creator}</span>
              <span> | </span>
              <span>{cardData?.PostedDate?.substring(0, 10)}</span>
            </p>
          </div>
          <div className="vertical-read-more">
            <Link to={`/Blog/${blogId}`}>Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
