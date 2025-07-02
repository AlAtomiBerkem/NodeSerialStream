import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import backBtn from "../../assets/Photo/BackBtn.png";
import PhotoText from "../../assets/Photo/PhotoText.png";

import Timer from "./Timer.jsx";

export default function BackgroundSelector({ onBack }) {
  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div className="background-selector-mask-btm-wrapper">
            <Timer />
          </div>
        </div>
        <img src={PhotoText} alt="text" className="background-selector-desc" />

        <button className="background-selector-btn" onClick={onBack}>
          <div className="background-selector-btn-wrapper">
            <img src={backBtn} alt="вернуться обратно" />
          </div>
        </button>
      </div>
    </>
  );
}
