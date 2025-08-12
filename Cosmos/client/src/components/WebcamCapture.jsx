import React from "react";
import Webcam from "react-webcam";
import { useCountdown } from '../context/CountdownContext.jsx';

const videoConstraints = {
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const { isCountdownActive, isProcessing } = useCountdown();

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    console.log('Снимок сделан:', imageSrc);
    return imageSrc;
  };


  React.useImperativeHandle(React.useRef(), () => ({
    capturePhoto
  }));

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
