import { useState, useCallback } from "react";
import BackgroundSelector from "./components/BackgroundSelector";
import Photo from "./components/PhotoCapture/Photo.jsx";
import WelcomeScreen from "./components/WelcomeScreen";
import { useInactivityRedirect } from "./utils/useInactivityRedirect.js";
import PhotoDone from "./components/PhotoResult/PhotoDone.jsx";
import "./styles/App.css";

function App() {
  const [step, setStep] = useState("welcome"); // 'welcome' | 'background' | 'photo' | 'done' | 'qr'
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [backgroundId, setBackgroundId] = useState(null);
  const [photoData, setPhotoData] = useState(null);

  const handleInactivity = useCallback(() => {
    setStep("welcome");
    setSelectedBackground(null);
    setBackgroundId(null);
    setPhotoData(null);
  }, []);

  useInactivityRedirect(handleInactivity);

  const handleBackgroundSelect = (url, id) => {
    setSelectedBackground(url);
    setBackgroundId(id);
    setStep("photo");
  };

  const handlePhotoDone = (data) => {
    setPhotoData(data);
    setStep("done");
  };

  const handleBackToMenu = () => {
    setStep("welcome");
    setSelectedBackground(null);
    setBackgroundId(null);
    setPhotoData(null);
  };

  return (
    <div className="app app-bg">
      {step === "welcome" && (
        <WelcomeScreen onStart={() => setStep("background")} />
      )}
      {step === "background" && !selectedBackground && (
        <BackgroundSelector
          onSelect={(url, id) => handleBackgroundSelect(url, id)}
        />
      )}
      {step === "photo" && selectedBackground && (
        <Photo
          onBack={() => {
            setSelectedBackground(null);
            setStep("background");
          }}
          onDone={handlePhotoDone}
        />
      )}
      {step === "done" && photoData && (
        <PhotoDone
          photoData={photoData}
          onBack={() => {
            setPhotoData(null);
            setStep("photo");
          }}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
