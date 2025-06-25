import { useState } from 'react';
import BackgroundLayout from './styles/BackgroundLayout.jsx';
import Greetings from './components/Greetings/Greetings.jsx';
import MainContent from './components/MainContent/MainContent.jsx';
import { useInactivityRedirect } from '../hooks/useInactiveRedirect.js';
import './styles/fonts.css';
import mainFon from './assets/mainFon.png'

function App() {
  const [showGreetings, setShowGreetings] = useState(true);

  const handleStart = () => {
    setShowGreetings(false);
  };

  useInactivityRedirect(() => {
    setShowGreetings(true);
  });

  return (
    <BackgroundLayout background={showGreetings ? undefined : mainFon}>
      {showGreetings ? <Greetings onStart={handleStart} /> : <MainContent />}
    </BackgroundLayout>
  );
}

export default App;
