import React from 'react';
import scaleBody from '../../UI/scale/scaleBody.svg';
import ruler from '../../UI/scale/ruler.png';

import akrobatSemibold from '../../UI/Fonts/Acrobat/akrobat-semibold.woff2';
import akrobatSemiboldWoff from '../../UI/Fonts/Acrobat/akrobat-semibold.woff';

 const fontStyles = `
  @font-face {
    font-family: 'Akrobat';
    src: url(${akrobatSemibold}) format('woff2'),
         url(${akrobatSemiboldWoff}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
`;


const Scale = ({ 
  currentQuestionIndex, 
  questions = [],
  userAnswers = [],
  onNumberClick,
  numberSpacing = 0
}) => {
  const totalQuestions = questions.length;
  if (totalQuestions === 0) return null;

  const rulerPosition = 100 - (currentQuestionIndex / (totalQuestions - 1)) * 100;
  const numbers = Array.from({ length: totalQuestions }, (_, i) => i);

  const getQuestionState = (index) => {
    const isCurrent = index === currentQuestionIndex;
    const questionId = questions[index]?.id;
    const isAnswered = userAnswers.some(answer => answer.questionId === questionId);

    if (isCurrent) {
      return isAnswered ? 'current-answered' : 'current-unanswered';
    }
    return isAnswered ? 'answered' : 'unanswered';
  };

   const numberStyles = {
    'current-unanswered': { 
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: '22px',
      opacity: 1,
    },
    'current-answered': { 
      color: '#72D8FF',
      fontWeight: 700,
      fontSize: '22px',
      opacity: 1,
      // textShadow: '0 0 1px rgba(114, 216, 255, 0.2)'
    },
    'unanswered': { 
      color: '#A1A1A1',
      fontWeight: 500,
      fontSize: '20px',
      opacity: 0.7
    },
    'answered': { 
      color: '#5b9db7',
      fontWeight: 500,
      fontSize: '20px',
      opacity: 0.9
    }
  };

  const numberPosition = (index) => {
    const position = (index / (totalQuestions - 1)) * 100;
    return `calc(${position}% + ${index * numberSpacing}px)`;
  };

  const formatNumber = (num) => {
    return num < 9 ? `0${num + 1}` : num + 1;
  };

   const animationDuration = 300;

  return (
    <div style={{
      position: 'absolute',
      top: '10.5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'transparent',
      width: '100%',
      maxWidth: '800px',
    }}>
      <img 
        src={scaleBody} 
        alt="scale" 
        style={{ 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }} 
      />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        maskImage: 'linear-gradient(to right, transparent 10%, black 30%, black 75%, transparent 90%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 30%, black 75%, transparent 90%)',
      }}>
        <div style={{
          position: 'absolute',
          top: '65%',
          left: `${rulerPosition}%`,
          transform: 'translate(-48.6%, -50%)',
          width: '100%',
          height: '20%',
          zIndex: 2,
          transition: `left ${animationDuration}ms ease-in-out`,
        }}>
          <img 
            src={ruler} 
            alt="ruler" 
            style={{ 
              width: '100%', 
              height: '100%',
              transition: `all ${animationDuration}ms ease-in-out` 
            }} 
          />
          
          <div style={{
            position: 'absolute',
            bottom: '200%',
            left: 0,
            width: '100%',
          }}>
            {numbers.map((index) => {
              const state = getQuestionState(index);
              return (
                <div 
                  key={index}
                  onClick={() => onNumberClick(index)}
                  style={{
                    color: numberStyles[state].color,
                    fontWeight: numberStyles[state].fontWeight,
                    fontSize: numberStyles[state].fontSize,
                    opacity: numberStyles[state].opacity,
                    position: 'absolute',
                    left: numberPosition(index),
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '0.5px',
                    transition: `all ${animationDuration}ms ease-in-out`,
                    textShadow: numberStyles[state].textShadow || 'none'
                  }}
                >
                  {formatNumber(index)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scale;