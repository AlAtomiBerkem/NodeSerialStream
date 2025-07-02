import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import BackBtn from "../../assets/Photo/BackBtn.png";
import PhotoText from "../../assets/Photo/PhotoText.png";

import Timer from "./Timer.jsx";
import WebcamDisplay from "./WebcamDisplay.jsx";

export default function BackgroundSelector({ onBack }) {
  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div style={{ position: 'absolute', left: 3, top: 5, width: '99%', height: '98%', zIndex: 1 }}>
            <WebcamDisplay
              onCapture={() => {}}
              isLoading={false}
              webcamStyle={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '10.3/16' }}
            />
          </div>
          <div className="background-selector-mask-btm-wrapper">
            <Timer />
          </div>
        </div>
        <img src={PhotoText} alt="text" className="background-selector-desc" />

        <button className="background-selector-btn" onClick={onBack}>
          <div className="background-selector-btn-wrapper">
            <img src={BackBtn} alt="вернуться обратно" />
          </div>
        </button>
      </div>
    </>
  );
}
