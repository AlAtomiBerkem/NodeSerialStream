import "../../styles/Timer.css";
import timeBackground from "../../assets/Photo/TimeBackground.png";
import one from "../../assets/Photo/One.png";
import two from "../../assets/Photo/Two.png";
import three from "../../assets/Photo/Three.png";
import photoIcon from "../../assets/Photo/PhotoIcon.png";

import { useState, useEffect } from "react";

export const Timer = ({ onFinish }) => {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(3);

  const images = {
    1: one,
    2: two,
    3: three,
  };

  useEffect(() => {
    let timer;
    if (isActive && count > 0) {
      timer = setTimeout(() => setCount((c) => c - 1), 1000);
    } else if (isActive && count === 0) {
      setIsActive(false);
      if (onFinish) onFinish();
    }
    return () => clearTimeout(timer);
  }, [isActive, count, onFinish]);

  const handleStart = () => {
    if (!isActive) {
      setCount(3);
      setIsActive(true);
    }
  };

  return (
    <div
      className="timer-container"
      style={{
        backgroundImage: `url(${timeBackground})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="box-shadow">
        <div className="box-shadow-blur"></div>
        {!isActive ? (
          <img
            src={photoIcon}
            alt="photoIcon"
            className="photo-icon"
            onClick={handleStart}
            style={{ cursor: "pointer" }}
          />
        ) : (
          count > 0 && (
            <img src={images[count]} alt={count} className="photo-icon" />
          )
        )}
      </div>
    </div>
  );
};

export default Timer;
