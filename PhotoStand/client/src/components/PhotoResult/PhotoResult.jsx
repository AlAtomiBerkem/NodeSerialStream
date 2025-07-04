import "../../styles/BackgroundSelector.css";
import fonMask from "../../assets/select_fons/fonMask.png";
import BackBtn from "../../assets/Photo/BackBtn.png";
import PhotoText from "../../assets/Photo/PhotoText.png";
import processing from "../../assets/PhotoResult/processing.png";
import processingText from "../../assets/PhotoResult/processing_text.png";
import { useEffect, useState } from "react";

export default function PhotoResult({ filename, onBack }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filename) return;
    let isActive = true;
    const checkStatus = async () => {
      try {
        const res = await fetch(`http://localhost:4000/check-status/${filename}`);
        const data = await res.json();
        if (data.status === "ready" && data.downloadUrl) {
          if (isActive) {
            setPhotoUrl(data.downloadUrl);
            setLoading(false);
          }
        } else if (isActive) {
          setTimeout(checkStatus, 1500);
        }
      } catch (e) {
        if (isActive) {
          setError("Ошибка загрузки фото");
          setLoading(false);
        }
      }
    };
    checkStatus();
    return () => { isActive = false; };
  }, [filename]);

  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div style={{ position: 'absolute', left: 3, top: 5, width: '99%', height: '98%', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <img src={processing} alt="Загрузка..." style={{maxWidth: '40%', maxHeight: '40%'}} />}
            {error && <span style={{color: 'red'}}>{error}</span>}
            {photoUrl && <img src={photoUrl} alt="Готовое фото" style={{maxWidth: '100%', maxHeight: '100%', borderRadius: 16}} />}
          </div>
        </div>
        <img src={loading ? processingText : PhotoText} alt="text" className="background-selector-desc" />
        {!loading && (
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
