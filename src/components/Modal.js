import React from "react";
// import "../components/NavBar/";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
// import Navbar from '../components/NavBar/NavBar';
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "./config";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ setOpenModal }) {
  const [action, setAction] = useState("Login Form");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  // const navigate = useNavigate()
  const history = useHistory();

  const FormData = {
    firstname,
    lastname,
    email,
    password,
    profile,
  };

  const LoginData = {
    email,
    password,
  };
  // form validationForm
  function validateForm() {}
  // end function for validationForm

  const handlesignup = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Use FormData directly without wrapping it in an object
      });

      if (firstname.length == 0) {
        toast("First Name can not be empty");
        return;
      } else if (lastname.length == 0) {
        toast("Last Name can not be empty");
        return;
      } else if (profile == null) {
        toast("Last Name can not be empty");
        return;
      }

      // Check if the Email is an Empty string or not.
      else if (email.length == 0) {
        toast("Email Address can not be empty");
        return;
      }

      // check if the password follows constraints or not.

      // if password length is less than 8 characters, toast invalid form.
      else if (password.length < 8) {
        toast("Password must contain greater than or equal to 8 characters.");
        return;
      }

      // variable to count upper case characters in the password.
      let countUpperCase = 0;
      // variable to count lowercase characters in the password.
      let countLowerCase = 0;
      // variable to count digit characters in the password.
      let countDigit = 0;
      // variable to count special characters in the password.
      let countSpecialCharacters = 0;

      for (let i = 0; i < password.length; i++) {
        const specialChars = [
          "!",
          "@",
          "#",
          "$",
          "%",
          "^",
          "&",
          "*",
          "(",
          ")",
          "_",
          "-",
          "+",
          "=",
          "[",
          "{",
          "]",
          "}",
          ":",
          ";",
          "<",
          ">",
        ];

        if (specialChars.includes(password[i])) {
          // this means that the character is special, so increment countSpecialCharacters
          countSpecialCharacters++;
        } else if (!isNaN(password[i] * 1)) {
          // this means that the character is a digit, so increment countDigit
          countDigit++;
        } else {
          if (password[i] == password[i].toUpperCase()) {
            // this means that the character is an upper case character, so increment countUpperCase
            countUpperCase++;
          }
          if (password[i] == password[i].toLowerCase()) {
            // this means that the character is lowercase, so increment countUpperCase
            countLowerCase++;
          }
        }
      }

      if (countLowerCase == 0) {
        // invalid form, 0 lowercase characters
        toast("Invalid Form, 0 lower case characters in password");
        return;
      }

      if (countUpperCase == 0) {
        // invalid form, 0 upper case characters
        toast("Invalid Form, 0 upper case characters in password");
        return;
      }

      if (countDigit == 0) {
        // invalid form, 0 digit characters
        toast("Invalid Form, 0 digit characters in password");
        return;
      }

      if (countSpecialCharacters == 0) {
        // invalid form, 0 special characters characters
        toast("Invalid Form, 0 special characters in password");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        toast("User are created successfully");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setProfile("");
      } else {
        toast("Failed to create user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (email.length == 0) {
        toast("Email can not be empty");
        return;
      } else if (password.length == 0) {
        toast("Password can not be empty");
        return;
      } else if (response.ok) {
        const loginResponse = await response.json();
        const userData = loginResponse.userModel;

        if (userData.role === "admin") {
          // Redirect to the dashboard for admin
          history.push("/chart");
        } else if (userData.role === "user") {
          // Redirect to the home page for users
          history.push("/");
        } else {
          // Handle other roles or scenarios as needed
          toast("Invalid role");
        }

        toast("Login successful");
        setOpenModal(false);
        localStorage.setItem("token", loginResponse.token);
        setEmail("");
        setPassword("");
      } else {
        toast("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="login-form-container">
          <div className="form-container">
            <div className="form">
              <div className="form-profile">
                <div className="user-image">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              <div className="titleCloseBtn">
                <FontAwesomeIcon
                  icon={faTimes}
                  className="close-icon"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                />
              </div>
              <h1>{action}</h1>
              <form action="" className="form-content">
                {action === "Login Form" ? (
                  <div></div>
                ) : (
                  <div className="email-container">
                    <label>First Name</label>
                    <br />
                    <input
                      type="text"
                      className="email"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                )}
                {action === "Login Form" ? (
                  <div></div>
                ) : (
                  <div className="password-container">
                    <label>Last Name</label>
                    <br />
                    <input
                      type="text"
                      className="password"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                )}

                <div className="email-container">
                  <label>Email</label>
                  <br />
                  <input
                    type="text"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="password-container">
                  <label>Password</label>
                  <br />
                  <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {action === "Login Form" ? (
                  <div></div>
                ) : (
                  <div className="profile-input">
                    <label className="profile">Upload photo</label>
                    <input
                      type="file"
                      name="profile"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                    />
                  </div>
                )}
                <div className="login-button">
                  {action === "SignUp Form" ? (
                    <div></div>
                  ) : (
                    <button
                      className={
                        action === "Sign Up"
                          ? "signupLogin gray"
                          : "signupLogin"
                      }
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogin(LoginData);
                      }}
                    >
                      Login
                    </button>
                  )}
                  {action === "Login Form" ? (
                    <div></div>
                  ) : (
                    <button
                      className={
                        action === "Login" ? "signupLogin gray" : "signupLogin"
                      }
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handlesignup(FormData);
                      }}
                    >
                      Sign Up
                    </button>
                  )}
                </div>
                {action === "SignUp Form" ? (
                  <div></div>
                ) : (
                  <p>
                    Don't have account?{" "}
                    <span
                      onClick={() => {
                        setAction("SignUp Form");
                      }}
                      className="span"
                    >
                      SIGN UP HERE
                    </span>
                  </p>
                )}
                {action === "Login Form" ? (
                  <div></div>
                ) : (
                  <p>
                    Already have account?{" "}
                    <span
                      onClick={() => {
                        setAction("Login Form");
                      }}
                      className="span"
                    >
                      LOGIN HERE
                    </span>{" "}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Modal;
