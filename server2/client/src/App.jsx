import { Routes, Route, useNavigate } from 'react-router-dom';
import ConnectionTab from "./screens/ConnectionTab.jsx";
import TestingStart from "./components/TestingStart.jsx";
import QuizCompleted from "./components/QuizComponents/QuizComponent.jsx";
import ErrorComponent from "./screens/ErrorComponent.jsx";
import TestingDone from "./screens/TestingDone.jsx";
import LoadingBackground from "./screens/LoadingBackground.jsx";
import QuizResults from "./components/QuizComponents/QuizResults.jsx"
import './reset.css';
import {useState, useEffect} from 'react'
import QuizeResult from "./components/QuizComponents/QuizResults.jsx"
import QuizPartSelect from "./components/QuizParts/QuizPartSelect.jsx"

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleStartButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/quiz');
      setIsLoading(false);
    }, 500);
  };

  const handleStartQuizeClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/testing-start');
      setIsLoading(false);
    }, 500);
  };

  const handleBackButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/testing-start');
      setIsLoading(false);
    }, 500);
  };

  const handleErrorButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/error');
      setIsLoading(false);
    }, 500);
  };

  const handleTestingDoneButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/testing-done');
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'e') {
        handleErrorButtonClick();
      } else if (event.key === 'r') {
        handleTestingDoneButtonClick();
      } else if (event.key === 's') {
        handleStartQuizeClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isLoading) {
    return <LoadingBackground />;
  }

  return (
    <Routes>
      <Route path="/" element={<ConnectionTab />} />
      <Route path="/testing-start" element={<TestingStart onStartButtonClick={handleStartButtonClick} onBackButtonClick={handleBackButtonClick} />} />
      <Route path="/quiz" element={<QuizCompleted />} />
      <Route path="/error" element={<ErrorComponent />} />
      <Route path="/testing-done" element={<TestingDone />} />
      <Route path="/quizResults" element={<QuizeResult />} />
      <Route path="/quizpartselect" element={<QuizPartSelect />} />
    </Routes>
  );
}

export default App;
