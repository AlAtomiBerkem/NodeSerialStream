import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import BackBtn from "../../assets/Photo/BackBtn.png";
import PhotoText from "../../assets/Photo/PhotoText.png";
import processing from "../../assets/PhotoResult/processing.png";
import processingText from "../../assets/PhotoResult/processing_text.png";
import { useEffect, useState } from "react";

export default function PhotoResult({ photoData, onBack }) {
  const [loading, setLoading] = useState(!photoData);

  // Если photoData есть — показываем фото сразу, иначе — анимацию ожидания
  // (на случай, если понадобится поддержка старой логики)

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
            {!photoData && (
              <img
                src={processing}
                alt="Загрузка..."
                style={{ maxWidth: "40%", maxHeight: "40%", display: 'block' }}
              />
            )}
            {photoData && (
              <img
                src={photoData}
                alt="Готовое фото"
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 16 }}
              />
            )}
          </div>
        </div>
        <img
          src={!photoData ? processingText : PhotoText}
          alt="text"
          className="background-selector-desc"
        />
        {photoData && (
          <button className="background-selector-btn" onClick={onBack}>
            <div className="background-selector-btn-wrapper">
              <img src={BackBtn} alt="вернуться обратно" />
            </div>
          </button>
        )}
      </div>
    </>
  );
} 