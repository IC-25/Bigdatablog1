import React from 'react'
import profile from '../image/Black.jpg'
function AboutCard() {
  return (
    <div className="aboutContent">
        <div className='about-content'>
        <div className="about-image">
           <img src={profile} alt="profile" />
        </div>
        <div className="about-text">
            <h1>I am Innocent ISHIMWE</h1>
            <p>
                UNIVERSITY OF RWANDA
                COLLEGE OF BUSINESS AND ECOCONOMICS (CBE)
                SCHOOL OF BUSINESS
                DEPARTMENT OF BIT
                LEVEL 3 
                Module code: BIT 3233
                Module Name: Big Data And Social Media
                Task: Assignment of to design a Blog
                Submmitted date: Tue,Nov 28,2023
                To: Lecturer Marc SENTWALI
            </p>
        </div>
    </div>
    </div>
  )
}

export default AboutCard