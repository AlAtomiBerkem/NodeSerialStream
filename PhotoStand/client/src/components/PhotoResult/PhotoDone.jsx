import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import doneText from "../../assets/PhotoResult/done_text.png";
import processing from "../../assets/PhotoResult/processing.png";
import { BtnGroup } from "./BtnGroup.jsx";
import PhotoQR from "./PhotoQR.jsx";
import { useState } from "react";

export default function PhotoDone({ photoData, onBack, onBackToMenu }) {
  const [showQR, setShowQR] = useState(false);
  if (showQR) return <PhotoQR onStart={onBackToMenu} />;

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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {photoData ? (
              <img
                src={photoData}
                alt="Готовое фото"
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 16 }}
              />
            ) : (
              <img
                src={processing}
                alt="Загрузка..."
                style={{ maxWidth: "40%", maxHeight: "40%", display: 'block' }}
              />
            )}
          </div>
        </div>
        <img
          src={doneText} alt="text" className="background-selector-desc"
        />

        <BtnGroup onAgain={onBack} onAccept={() => setShowQR(true)} />
      </div>
    </>
  );
} 