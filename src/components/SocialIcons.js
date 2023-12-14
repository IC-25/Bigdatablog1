import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faPinterest,
  faEnvelope,
} from "@fortawesome/free-brands-svg-icons";

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a href="https://www.facebook.com">
        <FontAwesomeIcon icon={faFacebook} size="2px" />
      </a>
      <a href="https://www.twitter.com">
        <FontAwesomeIcon icon={faTwitter} size="2px" />
      </a>
      <a href="https://www.linkedin.com">
        <FontAwesomeIcon icon={faLinkedin} size="2px" />
      </a>
      <a href="https://www.pinterest.com">
        <FontAwesomeIcon icon={faPinterest} size="2px" />
      </a>
    </div>
  );
};

export default SocialIcons;