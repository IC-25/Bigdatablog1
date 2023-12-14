import React from 'react';
import { Link } from 'react-router-dom';

function VerticalBlog({ cardData }) {
  return (
    <div className='vertical-content'>
    <div className="vertical-card-image">
      <img src={cardData.image} alt="bruce image" />
    </div>
    <div className="vertical-right-side">
      <h3>{cardData.title}</h3>

      <p className='description'>{cardData.description}</p>
      <div className="card-bottom">
        <div className="vertical-card-date">
          <p>
            <span>By {cardData.author}</span>
            <span> | </span>
            <span>{cardData.date}</span>
          </p>
        </div>
        <div className="vertical-read-more">
          <Link to={`/Blog/${cardData.id}`}>Read More</Link>
           </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalBlog;

