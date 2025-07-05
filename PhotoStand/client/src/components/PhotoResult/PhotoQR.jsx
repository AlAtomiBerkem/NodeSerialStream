import React from "react";
import logo from "../../assets/greeting/logo.png";
import BackToMenu from "../../assets/qr/BackToMenu.png";
import qrText from "../../assets/qr/qr-text.png";
import qr from "../../assets/qr/qr.png";
import backgroundSlice from "../../assets/greeting/background_slice.png";

import "../../styles/WelcomeScreen.css";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div
      className="welcome-screen"
      style={{
        background: `url(${backgroundSlice}) center center/cover no-repeat`,
      }}
    >
      <img
        src={qr}
        alt="q"
        className="welcome-description"
      />
      <img
        src={qrText}
        alt="qrText"
        className="welcome-description qr-text-img"
      />
      <img
        src={BackToMenu}
        alt="start"
        className="qr-back-btn"
        onClick={onStart}
        style={{ cursor: "pointer" }}
      />
      <img src={logo} alt="logo" className="welcome-logo" />
    </div>
  );
};

export default WelcomeScreen;
