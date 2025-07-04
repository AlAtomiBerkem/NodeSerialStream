import { useRef, forwardRef, useImperativeHandle } from "react";
import Webcam from "react-webcam";

const WebcamDisplay = forwardRef(({ onCapture, isLoading, webcamStyle = {} }, ref) => {
  const webcamRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getScreenshot: () => webcamRef.current.getScreenshot()
  }));

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
    </div>
  );
});

export default WebcamDisplay;
