import { useState } from 'react';
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

// Массив вопросов
const QUESTIONS = [
  { id: 1, text: "Правда ли то, что военный самолет Л-403 мог приземляться без шасси?", answer: true },
  { id: 2, text: "Какая сила действует перпендикулярно направлению набегающего потока воздуха и удерживает самолет в воздухе?  ", answer: false },
  { id: 3, text: "Правда ли то, что Миг-25 был одним из самых быстрых самолетов, способным развивать скорость более 3000 км/ч? ", answer: true },
  { id: 4, text: "Правда или ложь: Самолеты могут летать в космос?", answer: false }, 
  { id: 5, text: "Первый самолет был изобретен братьями Райт.?", answer: true },
  { id: 6, text: "вопрос 6", answer: true },
  { id: 7, text: "вопрос 7", answer: true },
  { id: 8, text: "вопрос 8", answer: true },
  { id: 9, text: "вопрос 9", answer: true },
  { id: 10, text: "вопрос 10", answer: true },
  { id: 11, text: "вопрос 11", answer: true },
  { id: 12, text: "вопрос 12", answer: true },
  { id: 13, text: "вопрос 13", answer: true },
  { id: 14, text: "вопрос 14", answer: true },
  { id: 15, text: "вопрос 15", answer: true },
  
];

export const QuizCompleted = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const {
    uiState,
    handleSelect,
    handleLeftBtnHover,
    handleRightBtnHover
  } = useButtonLogic();

  const handleNext = () => {
    if (uiState.selectedOption !== null && currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      handleSelect(null); // Сброс выбора для нового вопроса
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Восстанавливаем предыдущий ответ
      const prevAnswer = answers.find(a => a.questionId === QUESTIONS[currentIndex - 1].id);
      if (prevAnswer) {
        handleSelect(prevAnswer.userAnswer ? 'true' : 'false');
      }
    }
  };

  const handleAnswer = (answer) => {
    handleSelect(answer ? 'true' : 'false');
    setAnswers([
      ...answers.filter(a => a.questionId !== QUESTIONS[currentIndex].id),
      {
        questionId: QUESTIONS[currentIndex].id,
        userAnswer: answer,
        isCorrect: answer === QUESTIONS[currentIndex].answer
      }
    ]);
  };

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

      {/* Шкала */}
      <Scale 
        currentIndex={currentIndex} 
        totalQuestions={QUESTIONS.length} 
      />

      {/* Окно вопроса */}
      <QuestionWindow
        currentQuestion={QUESTIONS[currentIndex]}
        onNext={handleNext}
        onPrev={currentIndex > 0 ? handlePrev : null}
        selectedOption={uiState.selectedOption}
        onSelect={handleAnswer}
      />

      {/* Кнопки выбора True/False */}
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

      {/* Навигационные кнопки (можно оставить или заменить на кнопки в окне) */}
      <ButtonQuiz
        top="89%"
        left="22.5%"
        activeImg={getLeftBtnImage(uiState)}
        inactiveImg={getLeftBtnImage(uiState)}
        onClick={handlePrev}
        onMouseEnter={() => handleLeftBtnHover(true)}
        onMouseLeave={() => handleLeftBtnHover(false)}
        alt="Left navigation"
        disabled={currentIndex === 0}
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