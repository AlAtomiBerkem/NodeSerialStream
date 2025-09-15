import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRouter } from './app/router.jsx';
import './reset.css';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        import('./screens/ConnectionTab.jsx');
        import('./components/TestingStart.jsx');
        import('./components/QuizComponents/QuizComponent.jsx');
        import('./screens/ErrorComponent.jsx');
        import('./screens/TestingDone.jsx');
        import('./components/QuizComponents/QuizResults.jsx');
        import('./components/QuizParts/QuizPartSelect.jsx');
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

    return <AppRouter handlers={{
        onStartQuizeClick: handleStartQuizeClick,
        onStartButtonClick: handleStartButtonClick,
        onBackButtonClick: handleBackButtonClick,
    }} />;
}

export default App;
