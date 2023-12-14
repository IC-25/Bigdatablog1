import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

import "./dashboard.css";

const DashboardNavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const history = useHistory();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to log out?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      history.push("/");
    }
  };

  return (
    <header>
      <nav className={`navbar ${showNavbar && "responsive"}`}>
        <div className="navbar-dashboard">
          <div className="logo-container-dashboard">
            <div className="logo-dashboard">
              <h2>I~cent</h2>
            </div>
            <div className="title"></div>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <div className={`nav-elements ${showNavbar && "active"}`}>
            <ul className="nav-link">
              <li>
                <Link to="/chart">DASHBOARD</Link>
              </li>
              <li>
                <Link to="/analytics">ANALYTICS</Link>
              </li>
              <li className="link">
                <Link to="/post">POST</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  LOGOUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavBar;
