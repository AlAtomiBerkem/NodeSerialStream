import { useRef } from "react";
import Webcam from "react-webcam";

const WebcamDisplay = ({ onCapture, isLoading, webcamStyle = {} }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="relative w-full max-w-lg h-96">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        style={webcamStyle}
      />
      {/* <button
        onClick={capture}
        disabled={isLoading}
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white px-6 py-2 rounded-full ${
          isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Обработка..." : "Сделать снимок"}
      </button> */}
    </div>
  );
};

export default WebcamDisplay;
