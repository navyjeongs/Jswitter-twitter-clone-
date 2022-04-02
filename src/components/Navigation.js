import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  const getName = () => {
    const name = userObj.bc.email.split("@");
    return name[0];
  };

  return (
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link
          to="/"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>Go To Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName !== null
              ? userObj.displayName + "'s Profile"
              : getName() + "'s Profile"}
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
