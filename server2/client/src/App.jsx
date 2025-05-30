import React, { useState, useEffect } from 'react';
import ConnectionTab from "./screens/ConnectionTab.jsx";
import TestingStart from "./components/TestingStart.jsx";
import QuizCompleted from "./components/QuizComponent.jsx";
import ErrorComponent from "./screens/ErrorComponent.jsx";
import TestingDone from "./screens/TestingDone.jsx";
import LoadingBackground from "./screens/LoadingBackground.jsx";
import './reset.css';

function App() {
  const [currentComponent, setCurrentComponent] = useState('ConnectionTab');
  const [isLoading, setIsLoading] = useState(true);

  const handleStartButtonClick = () => {
    setIsLoading(true);
    setCurrentComponent('QuizCompleted');
  };

  const handleStartQuizeClick = () => {
    setIsLoading(true);
    setCurrentComponent('TestingStart');
  }

  const handleBackButtonClick = () => {
    setIsLoading(true);
    setCurrentComponent('TestingStart');
  };

  const handleErrorButtonClick = () => {
    setIsLoading(true);
    setCurrentComponent('ErrorComponent');
  };

  const handleTestingDoneButtonClick = () => {
    setIsLoading(true);
    setCurrentComponent('TestingDone');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (currentComponent !== 'ErrorComponent' && currentComponent !== 'TestingDone') {
        if (event.key === 'e') {
          handleErrorButtonClick();
        } else if (event.key === 'r') {
          handleTestingDoneButtonClick();
        } else if (event.key === 's') {
            handleStartQuizeClick();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentComponent]);

  useEffect(() => {
    // Имитация загрузки при каждом изменении компонента
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Уменьшите время, если загрузка происходит быстро

    return () => clearTimeout(timer);
  }, [currentComponent]);

  if (isLoading) {
    return <LoadingBackground />;
  }

  return (
    <div className='App'>
      {currentComponent === 'ConnectionTab' && <ConnectionTab />}
      {currentComponent === 'TestingStart' && (
        <TestingStart
          onStartButtonClick={handleStartButtonClick}
          onBackButtonClick={handleBackButtonClick}
        />
      )}
      {currentComponent === 'QuizCompleted' && <QuizCompleted />}
      {currentComponent === 'ErrorComponent' && <ErrorComponent />}
      {currentComponent === 'TestingDone' && <TestingDone />}
    </div>
  );
}

export default App;
