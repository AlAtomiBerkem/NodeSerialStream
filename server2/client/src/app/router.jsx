import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingBackground from '../screens/LoadingBackground.jsx';

const ConnectionTab = lazy(() => import('../screens/ConnectionTab.jsx'));
const TestingStart = lazy(() => import('../components/TestingStart.jsx'));
const QuizCompleted = lazy(() => import('../components/QuizComponents/QuizComponent.jsx'));
const ErrorComponent = lazy(() => import('../screens/ErrorComponent.jsx'));
const TestingDone = lazy(() => import('../screens/TestingDone.jsx'));
const QuizResults = lazy(() => import('../components/QuizComponents/QuizResults.jsx'));
const QuizPartSelect = lazy(() => import('../components/QuizParts/QuizPartSelect.jsx'));

export function AppRouter({ handlers }) {
    return (
        <Suspense fallback={<LoadingBackground />}>
            <Routes>
                <Route path="/" element={<ConnectionTab onStartQuizeClick={handlers.onStartQuizeClick} />} />
                <Route
                    path="/testing-start"
                    element={
                        <TestingStart
                            onStartButtonClick={handlers.onStartButtonClick}
                            onBackButtonClick={handlers.onBackButtonClick}
                        />
                    }
                />
                <Route path="/quiz" element={<QuizCompleted />} />
                <Route path="/error" element={<ErrorComponent />} />
                <Route path="/testing-done" element={<TestingDone />} />
                <Route path="/quizResults" element={<QuizResults />} />
                <Route path="/quizpartselect" element={<QuizPartSelect />} />
            </Routes>
        </Suspense>
    );
}


