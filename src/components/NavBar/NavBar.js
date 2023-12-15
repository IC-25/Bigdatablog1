import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Modal from '../Modal';

import "./NavBar.css";
import '../Modal.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="logo-container">
            <div className="logo">
              <h2>I~cent's M-blog </h2>
            </div>
            {/* <div className="title">
              <h3>THE ULTIMATE PHOTOGRAPHER</h3>
            </div> */}
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <div className={`nav-elements ${showNavbar && "active"}`}>
            <ul>
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FontAwesomeIcon icon={faUser} /> About
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faEnvelope} /> Contact
                </Link>
              </li>
              <li>
                  <button className="login"  onClick={() => {setModalOpen(true);}}>Login</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </>
  );
};

export default Navbar;