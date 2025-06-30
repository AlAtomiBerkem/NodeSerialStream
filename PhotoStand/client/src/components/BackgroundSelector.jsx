import { useState } from "react";
import "../styles/BackgroundSelector.css";

import photoText from "../assets/select_fons/photo_text.png";
import fonMask from "../assets/select_fons/fonMask.png";
import selectBtn from "../assets/select_fons/selectBtn.png";
import radioBtnActive from "../assets/select_fons/radioBtnActive.png";
import radioBtn from "../assets/select_fons/radionBtn.png";
import text from "../assets/select_fons/text.png";

import background_1 from "../fons/image 1.png";
import background_2 from "../fons/image 2.png";
import background_3 from "../fons/image 3.png";
import background_4 from "../fons/image 4.png";
import background_5 from "../fons/image 5.png";

const backgrounds = [
  { id: 1, url: background_1 },
  { id: 2, url: background_2 },
  { id: 3, url: background_3 },
  { id: 4, url: background_4 },
  { id: 5, url: background_5 },
];

export default function BackgroundSelector({ onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="conteiner-selecct">
        <div className="background-selector-mask-wrapper">
          <img src={fonMask} alt="Маска" className="background-selector-mask" />
          <div className="background-selector-image-wrapper">
            <img
              src={backgrounds[currentIndex].url}
              alt={`Фон ${currentIndex + 1}`}
              className="background-selector-image"
            />
            <div className="background-selector-radios">
              {backgrounds.map((_, idx) => (
                <img
                  key={idx}
                  src={idx === currentIndex ? radioBtnActive : radioBtn}
                  alt={idx === currentIndex ? "Выбрано" : "Не выбрано"}
                  className="background-selector-radio"
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
        <img src={text} alt="text" className="background-selector-desc" />
        <button
          onClick={() =>
            onSelect(
              backgrounds[currentIndex].url,
              backgrounds[currentIndex].id,
            )
          }
          className="background-selector-btn"
        >
          <img src={selectBtn} alt="Подтвердить выбор" />
        </button>
      </div>
    </>
  );
}
