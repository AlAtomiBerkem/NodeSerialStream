import React from 'react';
import { useSelector } from 'react-redux';
import Quizrezult from '../../UI/quizresult/QuizResult.png';
import ChooseActive from '../../UI/quizresult/ChooseActive.png';
import ChoosePushed from '../../UI/quizresult/ChoosePushed.png';
import ButtonQuiz from '../../helpers/ButtonQuiz';
import QuestionTrue from '../../UI/quizresult/QuestionTrue.png';
import QuestionFalse from '../../UI/quizresult/QuestionFalse.png';
import { fontStyles } from '../../helpers/fontStyle';
import QuizPartSelect from '../QuizParts/QuizPartSelect';
import { useState } from 'react';

const QuizResults = () => {
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    const { userAnswers, questions } = useSelector((state) => state.quiz);
    const [showComponents, setShowComponent] = useState(false);

    const correctAnswersCount = userAnswers.filter(
        (answer) => answer.isCorrect
    ).length;
    const totalQuestions = questions.length;

    const handleButtonClick = () => {
        setIsButtonActive(true);
        setTimeout(() => {
            setShowComponent(true);
        }, 200);
    };

    if (showComponents) {
        return <QuizPartSelect />;
    }

    return (
        <div>
            <style>{fontStyles}</style>

            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: `url(${Quizrezult})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                }}
            >
                {/* Основной счетчик правильных ответов */}
                <div
                    style={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'baseline',
                    }}
                >
                    <span
                        style={{
                            color: '#72D8FF',
                            fontSize: '128px',
                            fontWeight: 700,
                            fontFamily: "'Akrobat', sans-serif",
                            lineHeight: 1,
                            textShadow: '0 0 10px rgba(114, 216, 255, 0.9)',
                        }}
                    >
                        {correctAnswersCount}
                    </span>

                    <span
                        style={{
                            color: '#A1A1A1',
                            fontSize: '120px',
                            fontWeight: 400,
                            fontFamily: "'Akrobat', sans-serif",
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        /{totalQuestions}
                    </span>
                </div>

                {/* Контейнер с результатами по каждому вопросу */}
                <div
                    style={{
                        position: 'absolute',
                        top: '51.8%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '60%',
                        maxWidth: '700px',
                        padding: '10px',
                    }}
                >
                    {questions.map((question) => {
                        const userAnswer = userAnswers.find(
                            (a) => a.questionId === question.id
                        );
                        const isCorrect = userAnswer?.isCorrect;

                        return (
                            <img
                                key={question.id}
                                src={isCorrect ? QuestionTrue : QuestionFalse}
                                alt={
                                    isCorrect
                                        ? 'Правильный ответ'
                                        : 'Неправильный ответ'
                                }
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    objectFit: 'contain',
                                    margin: '0 2px',
                                }}
                            />
                        );
                    })}
                </div>

                <ButtonQuiz
                    top="75.5%"
                    left="50%"
                    activeImg={ChoosePushed}
                    inactiveImg={ChooseActive}
                    onClick={handleButtonClick}
                    isActive={isButtonActive}
                    alt="Choose option"
                />
            </div>
        </div>
    );
};

export default QuizResults;
