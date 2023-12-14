import React from 'react'
import SocialIcons from './SocialIcons'

function Footer() {
  return (
    <div className='Footer-container'>
        <div className="footer">
            <div className="footer-content">
            <h1>Contact Me</h1>
        <p className='footer-paragraph'>Phone number: +250 7884 52905</p>
        <p className='footer-paragraph'>Whatsapp: +250 7884 52905</p>
        <div className='contact-icon'>
           <SocialIcons />
        </div>
        <p className='footer-paragraph'>ishimweinnocent54@gmail.com</p>
        
            </div>
            <hr />
        <hr />
        <div className="copyright">
            <p>
                <span>Copyright © 2023 </span>
                <span> | </span>
                <span> Designed by Icent</span>
            </p>
        </div>
        </div>
    </div>
  )
}

export default Footer