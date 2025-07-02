import { useState } from "react";
import "../styles/BackgroundSelector.css";

import fonMask from "../assets/select_fons/fonMask.png";
import backBtn from "../assets/Photo/BackBtn.png";
import text from "../assets/select_fons/text.png";

import Timer from "./Timer";

export default function BackgroundSelector() {
  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div className="background-selector-mask-btm-wrapper">
            <Timer />
          </div>
        </div>
        <img src={text} alt="text" className="background-selector-desc" />

        <button className="background-selector-btn">
          <div className="background-selector-btn-wrapper">
            <img src={backBtn} alt="вернуться обратно" />
          </div>
        </button>
      </div>
    </>
  );
}
