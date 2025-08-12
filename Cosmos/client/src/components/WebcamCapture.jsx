import React from "react";
import Webcam from "react-webcam";
import { useCountdown } from '../context/CountdownContext.jsx';

const videoConstraints = {
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const { isCountdownActive } = useCountdown();

  // const handleCountdownComplete = () => {
  //   const imageSrc = webcamRef.current?.getScreenshot?.();
  //   console.log('отправили фото на сервер', imageSrc);
  // };

  return (
    <div className="fixed top-[120px] scale-[1.1] left-[600px] w-[700px] h-[700px]">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="absolute top-50 left-50 inset-0 w-full h-full object-cover oval-clip feather-oval oval-soft-shadow"
      />

      <img
        src="/Mask group.png"
        alt="mask"
        className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
};

export default WebcamCapture;
