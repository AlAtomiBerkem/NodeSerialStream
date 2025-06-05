import React from 'react';
import scaleBody from '../../UI/quizScale/scaleBody.svg';
import ruler from '../../UI/quizScale/ruler.png';
import { fontStyles } from '../../helpers/fontStyle';
import { numberStyles, animationDuration } from './numberStyles';

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

  const numberPosition = (index) => {
    const position = (index / (totalQuestions - 1)) * 100;
    return `calc(${position}% + ${index * numberSpacing}px)`;
  };

  const formatNumber = (num) => {
    return num < 9 ? `0${num + 1}` : num + 1;
  };

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
      <style>{fontStyles}</style>
      
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
                    ...numberStyles[state],
                    position: 'absolute',
                    left: numberPosition(index),
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '0.5px',
                    transition: `all ${animationDuration}ms ease-in-out`,
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