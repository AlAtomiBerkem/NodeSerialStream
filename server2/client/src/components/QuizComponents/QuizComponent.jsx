import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  backdrop,
  Scale,
  ButtonQuiz,
  TrueCheckDone,
  TrueCheck,
  FakeCheck,
  FakeCheckDone,
  useButtonLogic,
  getLeftBtnImage,
  getRightBtnImage,
  QuestionWindow,
  QuizResults,
  WarningModal,
  QUESTIONS
} from './imports.js';

import {
  setQuestions,
  answerQuestion,
  goToNextQuestion,
  goToPrevQuestion,
  goToQuestion,
  checkMissedQuestions
} from '../../store/slices/quizeSlice.js';


export const QuizCompleted = () => {
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    missedQuestions
  } = useSelector(state => state.quiz);

  const {
    uiState,
    handleSelect,
    handleLeftBtnClick,
    handleRightBtnClick
  } = useButtonLogic();

  const [showWarning, setShowWarning] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    dispatch(setQuestions(QUESTIONS));
    dispatch(checkMissedQuestions());
      if (showWarning && missedQuestions.length === 0) {
    setShowWarning(false);
  }
    const currentAnswer = userAnswers.find(a => 
      a.questionId === QUESTIONS[currentQuestionIndex]?.id
    );
    handleSelect(currentAnswer ? (currentAnswer.userAnswer ? 'true' : 'false') : null);
  }, [currentQuestionIndex, dispatch, userAnswers, showWarning]);

  const currentQuestion = questions[currentQuestionIndex];

const handleNext = () => {
  handleRightBtnClick();
  setTimeout(() => {
    if (currentQuestionIndex === questions.length - 1) {
      if (missedQuestions.length > 0) {
        setShowWarning(true);
      } else {
        setShowComponent(true);
      }
    } else {
      dispatch(goToNextQuestion());
    }
  }, 200);
};

  const handlePrev = () => {
    handleLeftBtnClick();
    setTimeout(() => {
      dispatch(goToPrevQuestion());
    }, 200);
  };

  const handleAnswer = (answer) => {
    const answerStr = answer ? 'true' : 'false';
    handleSelect(answerStr);
    dispatch(answerQuestion({ 
      questionId: currentQuestion.id,
      answer: answer
    }));
    dispatch(checkMissedQuestions());
  };

  if (!currentQuestion) return <div>{backdrop}</div>;

  if (showComponent) {
    return <QuizResults />;
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Scale
        currentQuestionIndex={currentQuestionIndex}
        questions={questions}
        userAnswers={userAnswers}
        onNumberClick={(index) => dispatch(goToQuestion(index))}
      />

      <QuestionWindow
        currentQuestion={currentQuestion}
        onNext={handleNext}
        onPrev={currentQuestionIndex > 0 ? handlePrev : null}
        selectedOption={uiState.selectedOption}
        onSelect={handleAnswer}
      />

      <ButtonQuiz
        top="89%"
        left="38%"
        activeImg={TrueCheckDone}
        inactiveImg={TrueCheck}
        onClick={() => handleAnswer(true)}
        isActive={uiState.selectedOption === 'true'}
        alt="True option"
      />

      <ButtonQuiz
        top="89%"
        left="65%"
        activeImg={FakeCheckDone}
        inactiveImg={FakeCheck}
        onClick={() => handleAnswer(false)}
        isActive={uiState.selectedOption === 'false'}
        alt="False option"
      />

      <ButtonQuiz
        top="89%"
        left="22.5%"
        activeImg={getLeftBtnImage(uiState)}
        inactiveImg={getLeftBtnImage(uiState)}
        onClick={handlePrev}
        alt="Left navigation"
        disabled={false}
      />

      <ButtonQuiz
        top="89%"
        left="80.5%"
        activeImg={getRightBtnImage(uiState)}
        inactiveImg={getRightBtnImage(uiState)}
        onClick={handleNext}
        alt="Right navigation"
        disabled={false}
      />
        {showWarning && <WarningModal missedQuestions={missedQuestions} />}

    </div>
  );
};

export default QuizCompleted;