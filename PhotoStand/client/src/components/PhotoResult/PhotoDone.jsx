import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import doneText from "../../assets/PhotoResult/done_text.png";
import processing from "../../assets/PhotoResult/processing.png";

export default function PhotoDone({ photoData, onBack }) {
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
        {photoData && (
          <button className="background-selector-btn" onClick={onBack}>
            Назад
          </button>
        )}
      </div>
    </>
  );
} 