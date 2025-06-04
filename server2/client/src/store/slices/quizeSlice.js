// store/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [], // Здесь будут храниться только правильные ответы
  showResults: false,
  validationError: null
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    answerQuestion(state, action) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (!currentQuestion) return;

      // Проверяем, совпадает ли ответ пользователя с правильным ответом
      if (action.payload.answer === currentQuestion.answer) {
        const existingAnswerIndex = state.userAnswers.findIndex(
          a => a.questionId === currentQuestion.id
        );

        const newAnswer = {
          questionId: currentQuestion.id,
          userAnswer: action.payload.answer,
          isCorrect: true // Всегда true, так как мы сохраняем только правильные ответы
        };

        if (existingAnswerIndex >= 0) {
          state.userAnswers[existingAnswerIndex] = newAnswer;
        } else {
          state.userAnswers.push(newAnswer);
        }
      } else {
        // Удаляем ответ, если он был сохранен ранее, но теперь неправильный
        state.userAnswers = state.userAnswers.filter(
          a => a.questionId !== currentQuestion.id
        );
      }
    },
    goToNextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    goToPrevQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
    },
    showResults(state) {
      const unansweredIds = state.questions
        .filter(q => !state.userAnswers.some(a => a.questionId === q.id))
        .map(q => q.id);
      
      if (unansweredIds.length > 0) {
        state.validationError = {
          title: "Не все вопросы отвечены",
          unansweredIds
        };
        return;
      }
      
      state.showResults = true;
    },
    hideResults(state) {
      state.showResults = false;
      state.validationError = null;
    },
    dismissError(state) {
      state.validationError = null;
    },
    goToQuestion: (state, action) => {
      if (action.payload >= 0 && action.payload < state.questions.length) {
        state.currentQuestionIndex = action.payload;
      }
    }
  },
});

export const {
  setQuestions,
  answerQuestion,
  goToNextQuestion,
  goToPrevQuestion,
  resetQuiz,
  hideResults,
  dismissError,
  showResults,
  goToQuestion
} = quizSlice.actions;

export default quizSlice.reducer;