import React from "react";
import logo from "../assets/greeting/logo.png";
import button from "../assets/greeting/button.png";
import description from "../assets/greeting/discription.png";
import "../styles/WelcomeScreen.css";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <img src={description} alt="description" className="welcome-description" />
      <img
        src={button}
        alt="start"
        className="welcome-start-btn"
        onClick={onStart}
        style={{ cursor: 'pointer' }}
      />
      <img src={logo} alt="logo" className="welcome-logo" />
    </div>
  );
};

export default WelcomeScreen; 