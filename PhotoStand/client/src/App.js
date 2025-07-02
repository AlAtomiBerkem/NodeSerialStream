// import { useState } from "react";
// import BackgroundSelector from "./components/BackgroundSelector";
// import PhotoCapture from "./components/PhotoCapture/PhotoCapture.jsx";
// import WelcomeScreen from "./components/WelcomeScreen";
// import "./styles/App.css";

// function App() {
//   const [step, setStep] = useState("welcome"); // 'welcome' | 'background' | 'photo'
//   const [selectedBackground, setSelectedBackground] = useState(null);
//   const [backgroundId, setBackgroundId] = useState(null);

//   const handleBackgroundSelect = (url, id) => {
//     setSelectedBackground(url);
//     setBackgroundId(id);
//     setStep("photo");
//   };

//   return (
//     <div className="app app-bg">
//       {step === "welcome" && (
//         <WelcomeScreen onStart={() => setStep("background")} />
//       )}
//       {step === "background" && !selectedBackground && (
//         <BackgroundSelector
//           onSelect={(url, id) => handleBackgroundSelect(url, id)}
//         />
//       )}
//       {step === "photo" && selectedBackground && (
//         <PhotoCapture
//           backgroundId={backgroundId}
//           onBack={() => {
//             setSelectedBackground(null);
//             setStep("background");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import Timer from "./components/PhotoCapture/Timer.jsx";

function App() {
  return <Timer />;
}

export default App;
