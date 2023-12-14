import React from 'react'

function ContactForm() {
  return (
    <div className='contactForm-container'>
        <div className="contactForm-content">
        <h2>// CONTACT ME//</h2>
        <form action="">
            <div className="subject">
            <input type="text" placeholder='Subject' className='subject'/>
            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder='Message'/>
            <div className="nameEmail">
            <input type="text" placeholder='Name'/>
            <input type="text" placeholder='Email'/>
            </div>
            <div className="send-button">
            <button type='submit'>SEND MESSAGE</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default ContactForm