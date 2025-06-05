import { Routes, Route, useNavigate } from 'react-router-dom';
import './reset.css';
import {useState, useEffect, lazy, Suspense} from 'react'
import LoadingBackground from './screens/LoadingBackground.jsx'


const ConnectionTab = lazy(() => import("./screens/ConnectionTab.jsx"));
const TestingStart = lazy(() => import("./components/TestingStart.jsx"));
const QuizCompleted = lazy(() => import("./components/QuizComponents/QuizComponent.jsx"));
const ErrorComponent = lazy(() => import("./screens/ErrorComponent.jsx"));
const TestingDone = lazy(() => import("./screens/TestingDone.jsx"));
const QuizResults = lazy(() => import("./components/QuizComponents/QuizResults.jsx"));
const QuizPartSelect = lazy(() => import("./components/QuizParts/QuizPartSelect.jsx"));

function App() {
  const navigate = useNavigate();

    useEffect(() => {
    import("./screens/ConnectionTab.jsx");
    import("./components/TestingStart.jsx");
    import("./components/QuizComponents/QuizComponent.jsx");
    import("./screens/ErrorComponent.jsx");
    import("./screens/TestingDone.jsx");
    import("./components/QuizComponents/QuizResults.jsx");
    import("./components/QuizParts/QuizPartSelect.jsx");
  }, []);

  const handleStartButtonClick = () => {
    navigate('/quiz');
  };

  const handleStartQuizeClick = () => {
    navigate('/testing-start');
  };

  const handleBackButtonClick = () => {
    navigate('/testing-start');
  };

  const handleErrorButtonClick = () => {
    navigate('/error');
  };

  const handleTestingDoneButtonClick = () => {
    navigate('/testing-done');
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

  return (
    <Suspense fallback={<LoadingBackground />}>
      <Routes>
        <Route path="/" element={<ConnectionTab onStartQuizeClick={handleStartQuizeClick} />} />
        <Route path="/testing-start" element={<TestingStart onStartButtonClick={handleStartButtonClick} onBackButtonClick={handleBackButtonClick} />} />
        <Route path="/quiz" element={<QuizCompleted />} />
        <Route path="/error" element={<ErrorComponent />} />
        <Route path="/testing-done" element={<TestingDone />} />
        <Route path="/quizResults" element={<QuizResults />} />
        <Route path="/quizpartselect" element={<QuizPartSelect />} />
      </Routes>
    </Suspense>
  );
}

export default App;
