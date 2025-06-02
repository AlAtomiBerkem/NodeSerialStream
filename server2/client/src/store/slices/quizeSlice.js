// store/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
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

      const existingAnswerIndex = state.userAnswers.findIndex(
        a => a.questionId === currentQuestion.id
      );

      const newAnswer = {
        questionId: currentQuestion.id,
        userAnswer: action.payload.answer,
        isCorrect: action.payload.answer === currentQuestion.answer,
      };

      if (existingAnswerIndex >= 0) {
        state.userAnswers[existingAnswerIndex] = newAnswer;
      } else {
        state.userAnswers.push(newAnswer);
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
  },
});

export const {
  setQuestions,
  answerQuestion,
  goToNextQuestion,
  goToPrevQuestion,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;