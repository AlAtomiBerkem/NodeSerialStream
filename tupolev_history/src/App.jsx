import { useState } from 'react';
import BackgroundLayout from './components/BackgroundLayout.jsx';
import Greetings from './components/Greetings/Greetings.jsx';
import MainContent from './components/MainContent/MainContentCard.jsx';
import { useInactivityRedirect } from '../hooks/useInactiveRedirect.js';
import './styles/fonts.css'

function App() {
  const [showGreetings, setShowGreetings] = useState(true);  // Начинаем с приветствия

  const handleStart = () => {
    setShowGreetings(false);
  };

  useInactivityRedirect(() => {
    setShowGreetings(true);
  });

  return (
    <BackgroundLayout>
      {showGreetings ? (
        <Greetings onStart={handleStart} />
      ) : (
        <MainContent />
      )}
    </BackgroundLayout>
  );
}

export default App;