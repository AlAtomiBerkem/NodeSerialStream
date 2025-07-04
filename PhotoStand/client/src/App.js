import { useState, useCallback } from "react";
import BackgroundSelector from "./components/BackgroundSelector";
import Photo from "./components/PhotoCapture/Photo.jsx";
import WelcomeScreen from "./components/WelcomeScreen";
import { useInactivityRedirect } from "./utils/useInactivityRedirect.js";
import "./styles/App.css";

function App() {
  const [step, setStep] = useState("welcome"); // 'welcome' | 'background' | 'photo'
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [backgroundId, setBackgroundId] = useState(null);

  const handleInactivity = useCallback(() => {
    setStep("welcome");
    setSelectedBackground(null);
    setBackgroundId(null);
  }, []);

  useInactivityRedirect(handleInactivity);

  const handleBackgroundSelect = (url, id) => {
    setSelectedBackground(url);
    setBackgroundId(id);
    setStep("photo");
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
        />
      )}
    </div>
  );
}

export default App;
