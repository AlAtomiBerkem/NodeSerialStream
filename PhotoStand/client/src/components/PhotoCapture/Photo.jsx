import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import BackBtn from "../../assets/Photo/BackBtn.png";
import PhotoText from "../../assets/Photo/PhotoText.png";

import Timer from "./Timer.jsx";
import WebcamDisplay from "./WebcamDisplay.jsx";
import PhotoResult from "./PhotoResult.jsx";
import { useRef, useState } from "react";

export default function BackgroundSelector({ onBack }) {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("");
  const [resultFilename, setResultFilename] = useState(null);

  const handleTimerFinish = async () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setStatus("Отправка...");
        try {
          const res = await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image, backgroundId: 1 })
          });
          const data = await res.json();
          if (data.success && data.filename) {
            setResultFilename(data.filename);
            setStatus("");
          } else {
            setStatus("Ошибка загрузки: " + (data.error || "unknown"));
          }
        } catch (e) {
          setStatus("Ошибка соединения с сервером");
        }
      }
    }
  };

  if (resultFilename) {
    return <PhotoResult filename={resultFilename} onBack={() => {
      setResultFilename(null);
      setStatus("");
    }} />;
  }

  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div style={{ position: 'absolute', left: 3, top: 5, width: '99%', height: '98%', zIndex: 1 }}>
            <WebcamDisplay
              ref={webcamRef}
              onCapture={() => {}}
              isLoading={false}
              webcamStyle={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '10.3/16' }}
            />
          </div>
          <div className="background-selector-mask-btm-wrapper">
            <Timer onFinish={handleTimerFinish} />
          </div>
        </div>
        <img src={PhotoText} alt="text" className="background-selector-desc" />
        {status && <div style={{color: 'white', textAlign: 'center', margin: 16}}>{status}</div>}
        <button className="background-selector-btn" onClick={onBack}>
          <div className="background-selector-btn-wrapper">
            <img src={BackBtn} alt="вернуться обратно" />
          </div>
        </button>
      </div>
    </>
  );
}
