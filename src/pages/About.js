import React from 'react'
import AboutCard from '../components/About/AboutCard'
import Footer from '../components/Footer'
import Navbar from '../components/NavBar/NavBar'
function About() {
  return (
    <>
    <Navbar />
      <div className="about-container">
        <div className="AboutContainer">
        <AboutCard />
        <Footer />
        </div>
    </div>    
    </>
  )
}

export default About