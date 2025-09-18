import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingBackground from '../screens/LoadingBackground.jsx';
import { useSelector } from 'react-redux';

const ConnectionTab = lazy(() => import('../screens/ConnectionTab.jsx'));
const TestingStart = lazy(() => import('../components/TestingStart.jsx'));
const QuizCompleted = lazy(() => import('../components/QuizComponents/QuizComponent.jsx'));
const ErrorComponent = lazy(() => import('../screens/ErrorComponent.jsx'));
const TestingDone = lazy(() => import('../screens/TestingDone.jsx'));
const QuizResults = lazy(() => import('../components/QuizComponents/QuizResults.jsx'));
const QuizPartSelect = lazy(() => import('../components/QuizParts/QuizPartSelect.jsx'));

function QuizGuard({ children }) {
    const { registered, readiness } = useSelector((s) => s.device);
    const allowed = registered === true && readiness && readiness.ready === true;
    if (allowed) return children;
    return <Navigate to="/" replace />;
}

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
                <Route path="/quiz" element={
                    <QuizGuard>
                        <QuizCompleted />
                    </QuizGuard>
                } />
                <Route path="/error" element={<ErrorComponent />} />
                <Route path="/testing-done" element={<TestingDone />} />
                <Route path="/quizResults" element={<QuizResults />} />
                <Route path="/quizpartselect" element={<QuizPartSelect />} />
            </Routes>
        </Suspense>
    );
}



