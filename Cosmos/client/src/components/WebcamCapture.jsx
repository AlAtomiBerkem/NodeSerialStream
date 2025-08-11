import React from "react";
import Webcam from "react-webcam";

// Рекомендуемые настройки камеры (можно менять под устройство)
const videoConstraints = {
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    // Здесь можешь сохранить imageSrc или отправить на сервер
  }, []);

  return (
    <div className="relative w-[700px] h-[700px]">
      {/* Слой с камерой, обрезанный овальной маской */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="absolute inset-0 w-full h-full object-cover oval-clip"
      />

      {/* PNG-фрейм поверх камеры (не перехватывает клики) */}
      <img
        src="/Mask group.png"
        alt="mask"
        className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none"
      />

      {/* Пример кнопки - для теста */}
      <button
        onClick={capture}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded bg-white/80 text-black"
      >
        Capture photo
      </button>
    </div>
  );
};

export default WebcamCapture;
