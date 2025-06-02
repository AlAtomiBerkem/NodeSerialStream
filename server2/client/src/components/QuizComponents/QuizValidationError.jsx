// components/QuizValidationError.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissError } from '../../store/slices/quizeSlice';

const QuizValidationError = () => {
  const dispatch = useDispatch();
  const { validationError } = useSelector(state => state.quiz);

  if (!validationError) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 235, 235, 0.95)',
      padding: '30px',
      borderRadius: '15px',
      width: '80%',
      maxWidth: '500px',
      textAlign: 'center',
      zIndex: 1000,
      boxShadow: '0 0 20px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ color: '#F44336', marginTop: 0 }}>{validationError.title}</h3>
      <p>Вы не ответили на {validationError.unansweredIds.length} вопросов</p>
      <button
        onClick={() => dispatch(dismissError())}
        style={{
          padding: '10px 20px',
          background: '#F44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Понятно
      </button>
    </div>
  );
};

export default QuizValidationError;
