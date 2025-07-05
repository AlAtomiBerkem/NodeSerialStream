import React from "react";
import logo from "../assets/greeting/logo.png";
import button from "../assets/greeting/button.png";
import description from "../assets/greeting/discription.png";
import backgroundSlice from "../assets/greeting/background_slice.png";

import "../styles/WelcomeScreen.css";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div
      className="welcome-screen"
      style={{
        background: `url(${backgroundSlice}) center center/cover no-repeat`,
      }}
    >
      <img
        src={description}
        alt="description"
        className="welcome-description"
      />
      <img
        src={button}
        alt="start"
        className="welcome-start-btn"
        onClick={onStart}
        style={{ cursor: "pointer" }}
      />
      <img src={logo} alt="logo" className="welcome-logo" />
    </div>
  );
};

export default WelcomeScreen;
