import React from 'react'
import ContactPage from '../components/Contact/ContactPage'
import ContactForm from '../components/Contact/ContactForm'
import Navbar from '../components/NavBar/NavBar'

function Contact() {
  return (
    <div>
      <Navbar />
        <ContactPage />
        <ContactForm />
    </div>
  )
}

export default Contact