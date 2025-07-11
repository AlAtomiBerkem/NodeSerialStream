import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import BackBtn from "../../assets/Photo/BackBtn.png";
import PhotoText from "../../assets/Photo/PhotoText.png";

import Timer from "./Timer.jsx";
import WebcamDisplay from "./WebcamDisplay.jsx";
import PhotoResult from "../PhotoResult/PhotoResult.jsx";
import PhotoDone from "../PhotoResult/PhotoDone.jsx";
import { useRef, useState } from "react";

export default function BackgroundSelector({ backgroundId, onBack, onDone }) {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  const handleTimerFinish = async () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setLoading(true);
        setStatus("");
        try {
          const res = await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image, backgroundId })
          });
          const data = await res.json();
          if (data.success && data.base64) {
            setLoading(false);
            if (onDone) onDone(data.base64);
          } else {
            setStatus("Ошибка загрузки: " + (data.error || "unknown"));
            setLoading(false);
          }
        } catch (e) {
          setStatus("Ошибка соединения с сервером");
          setLoading(false);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div
            style={{
              position: "absolute",
              left: 3,
              top: 5,
              width: "99%",
              height: "98%",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={require("../../assets/PhotoResult/processing.png")}
              alt="Загрузка..."
              style={{ maxWidth: "60%", maxHeight: "60%", display: "block" }}
            />
          </div>
        </div>
        <img src={PhotoText} alt="text" className="background-selector-desc" />
      </div>
    );
  }

  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div
            style={{
              position: "absolute",
              left: 3,
              top: 5,
              width: "99%",
              height: "98%",
              zIndex: 1,
            }}
          >
            <WebcamDisplay
              ref={webcamRef}
              onCapture={() => {}}
              isLoading={loading}
              webcamStyle={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "10.3/16",
              }}
            />
          </div>
          <div className="background-selector-mask-btm-wrapper">
            <Timer onFinish={handleTimerFinish} />
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
