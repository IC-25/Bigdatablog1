import React from 'react';
import VerticalBlog from './VerticalBlog';
import { VerticalDataArray } from './api';

function VerticalCard() {
  return (
    <section className='section-two'>
      <div className="vertical-container">
        {VerticalDataArray.map((cardData) => (
          <VerticalBlog key={cardData.id} cardData={cardData} />
        ))}
      </div>
    </section>
  );
}

export default VerticalCard;
