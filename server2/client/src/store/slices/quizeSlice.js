import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  showResults: false,
  validationError: null,
  missedQuestions: [] 
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
        isCorrect: action.payload.answer === currentQuestion.answer
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
    },
    checkMissedQuestions(state) {
      const answeredIds = state.userAnswers.map(a => a.questionId);
      state.missedQuestions = state.questions.filter(q => !answeredIds.includes(q.id)).map(q => q.id);
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
  goToQuestion,
  checkMissedQuestions 
} = quizSlice.actions;

export default quizSlice.reducer;