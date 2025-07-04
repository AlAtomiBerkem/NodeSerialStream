import { useState } from "react";
import "../styles/BackgroundSelector.css";
import { motion, AnimatePresence } from "framer-motion";

import fonMask from "../assets/select_fons/fonMask.png";
import selectBtn from "../assets/select_fons/selectBtn.png";
import radioBtnActive from "../assets/select_fons/radioBtnActive.png";
import radioBtn from "../assets/select_fons/radionBtn.png";
import text from "../assets/select_fons/text.png";
import maskBtmGroup from "../assets/select_fons/mask_btn_group.png";

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
  const [direction, setDirection] = useState(0);

  const handleChange = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute"
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative"
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute"
    })
  };

  return (
    <>
      <div className="conteiner-selecct">
        <div
          className="background-selector-mask-wrapper"
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '720px',
            height: '1080px',
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        >
          <img src={fonMask} alt="Маска" className="background-selector-mask" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={currentIndex}
              src={backgrounds[currentIndex].url}
              alt="Фон"
              className="background-selector-fill-image"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                zIndex: 2,
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AnimatePresence>
          <div className="background-selector-mask-btm-wrapper">
            <img
              src={maskBtmGroup}
              alt="Маска низ"
              className="background-selector-mask-btm"
            />
            <div className="background-selector-radio-group">
              {backgrounds.map((bg, idx) => (
                <button
                  key={bg.id}
                  className="background-selector-radio-btn"
                  onClick={() => handleChange(idx)}
                  type="button"
                >
                  <img
                    src={currentIndex === idx ? radioBtnActive : radioBtn}
                    alt={currentIndex === idx ? "Выбрано" : "Не выбрано"}
                  />
                </button>
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
          <div className="background-selector-btn-wrapper">
            <img src={selectBtn} alt="Подтвердить выбор" />
          </div>
        </button>
      </div>
    </>
  );
}
