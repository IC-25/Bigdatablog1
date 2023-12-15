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
                UNIVERSITY OF RWANDA <br></br>
                COLLEGE OF BUSINESS AND ECOCONOMICS (CBE),
                SCHOOL OF BUSINESS,
                DEPARTMENT OF BIT,
                LEVEL 3,
                Module code: BIT 3233 <br></br>
                Module Name: Big Data And Social Media <br></br>
                Task: Assignment of to design a Blog <br></br>
                Submmitted date: Fri,Dec 15,2023 <br></br>
                To: Lecturer Marc SENTWALI <br></br>
            </p>
        </div>
    </div>
    </div>
  )
}

export default AboutCard