import { useState, useEffect } from 'react';
import backdrop from '../../UI/backdrops/qqq.png';
import Scale from './Scale.jsx';
import ButtonQuiz from '../../helpers/ButoonQuiz.jsx';
import TrueCheckDone from '../../UI/selectioAndMoveBtn/TryCheck.svg';
import TrueCheck from '../../UI/selectioAndMoveBtn/TryUnCheck.svg';
import FakeCheck from '../../UI/selectioAndMoveBtn/FakeUnCheck.svg';
import FakeCheckDone from '../../UI/selectioAndMoveBtn/FakeCheck.svg';
import { useButtonLogic } from './useButtonLogicl.js';
import { getLeftBtnImage, getRightBtnImage } from './buttonUtils.js';
import QuestionWindow from './QuestionWindow.jsx';

import { setQuestions, answerQuestion, goToNextQuestion, goToPrevQuestion } from '../../store/slices/quizeSlice.js';
import { useSelector, useDispatch } from 'react-redux';


 const QUESTIONS = [
  { id: 0, text: "Правда ли то, что военный самолет Л-403 мог приземляться без шасси? [true]", answer: true },
  { id: 1, text: "Какая сила действует перпендикулярно направлению набегающего потока воздуха и удерживает самолет в воздухе? [false] ", answer: false },
  { id: 2, text: "Правда ли то, что Миг-25 был одним из самых быстрых самолетов, способным развивать скорость более 3000 км/ч? [true]", answer: true },
  { id: 3, text: "Правда или ложь: Самолеты могут летать в космос? [false]", answer: false }, 
  { id: 4, text: "Первый самолет был изобретен братьями Райт.? [true]", answer: true },
  { id: 5, text: "Утверждение: Airbus A380 является самым большим пассажирским самолетом в мире? [ture]", answer: true },
  { id: 6, text: "Правда ли то, Самолет может взлететь без использования двигателей [false]", answer: false },
  { id: 7, text: "Утверждение: Братья Райт были первыми, кто совершил управляемый полет на самолете.8 [true]", answer: true },
  { id: 8, text: "Утверждение: Парашюты используются для пассажиров в коммерческих авиалайнерах [false]", answer: false },
  { id: 9, text: "Утверждение: Самолет может лететь быстрее скорости звука. [true]", answer: true },
  { id: 10, text: "Утверждение: Boeing 747 является первым в мире реактивным пассажирским самолетом [false].", answer: false },
  { id: 11, text: "Утверждение: Автопилот используется в современных коммерческих самолетах [true]", answer: true },
  { id: 12, text: "Утверждение: Самолет может приземлиться на воду, если у него нет поплавков [false]", answer: false },
  { id: 13, text: "Черный ящик на самолете действительно черного цвета [false]", answer: false },
  { id: 14, text: " Конкорд был первым пассажирским самолетом, способным лететь быстрее скорости звука [true]", answer: true },
  
];
 
 
 
export const QuizCompleted = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, userAnswers } = useSelector(state => state.quiz);
  
  const {
    uiState,
    handleSelect,
    handleLeftBtnHover,
    handleRightBtnHover
  } = useButtonLogic();

  // Инициализация вопросов при монтировании компонента
  useEffect(() => {
    dispatch(setQuestions(QUESTIONS));
  }, [dispatch]);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleNext = () => {
    if (uiState.selectedOption !== null && currentQuestionIndex < questions.length - 1) {
      dispatch(goToNextQuestion());
      handleSelect(null);  
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      dispatch(goToPrevQuestion());
       const prevAnswer = userAnswers.find(a => a.questionId === questions[currentQuestionIndex - 1]?.id);
      if (prevAnswer) {
        handleSelect(prevAnswer.userAnswer ? 'true' : 'false');
      }
    }
  };

  const handleAnswer = (answer) => {
    handleSelect(answer ? 'true' : 'false');
    dispatch(answerQuestion({ answer }));
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
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
        currentIndex={currentQuestionIndex} 
        totalQuestions={questions.length} 
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
        onMouseEnter={() => handleLeftBtnHover(true)}
        onMouseLeave={() => handleLeftBtnHover(false)}
        alt="Left navigation"
        disabled={currentQuestionIndex === 0}
      />
      
      <ButtonQuiz
        top="89%"
        left="80.5%"
        activeImg={getRightBtnImage(uiState)}
        inactiveImg={getRightBtnImage(uiState)}
        onClick={handleNext}
        onMouseEnter={() => handleRightBtnHover(true)}
        onMouseLeave={() => handleRightBtnHover(false)}
        alt="Right navigation"
        disabled={uiState.selectedOption === null}
      />
    </div>
  );
};

export default QuizCompleted;