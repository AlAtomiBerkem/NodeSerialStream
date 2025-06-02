import React from 'react';
import scaleBody from '../../UI/scale/scaleBody.svg';
import ruler from '../../UI/scale/ruler.png';

const Scale = ({ 
  currentIndex, 
  totalQuestions,
  answeredQuestions = [],
  activeRange = [0, 14],
  onNumberClick,
  numberSpacing = 0
}) => {
  const rulerPosition = 100 - (currentIndex / (totalQuestions - 1)) * 100;
  const numbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);
  
  const getNumberState = (index) => {
    const isAnswered = answeredQuestions.includes(index);
    const isActive = index >= activeRange[0] && index <= activeRange[1];
    return `${isAnswered ? 'answered' : 'unanswered'}-${isActive ? 'active' : 'disabled'}`;
  };

  const numberStyles = {
    'answered-active': { 
      color: '#4CAF50', 
      fontWeight: '700', 
      cursor: 'pointer',
      fontFamily: 'Arial, sans-serif'
    },
    'unanswered-active': { 
      color: '#A1A1A1', 
      fontWeight: '500', 
      cursor: 'pointer',
      fontFamily: 'Arial, sans-serif'
    },
    'answered-disabled': { 
      color: '#A1A1A1', 
      fontWeight: '700', 
      cursor: 'default',
      fontFamily: 'Arial, sans-serif'
    },
    'unanswered-disabled': { 
      color: '#A1A1A1', 
      fontWeight: '400', 
      cursor: 'default',
      fontFamily: 'Arial, sans-serif'
    }
  };

  const numberPosition = (index) => {
    const position = (index / (totalQuestions - 1)) * 100;
    return `calc(${position}% + ${index * numberSpacing}px)`;
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
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
     {/* Шкала */}
      <img 
        src={scaleBody} 
        alt="scale" 
        style={{ 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }} 
      />
      
      {/* Контейнер для линейки и цифр с градиентной маской */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        maskImage: 'linear-gradient(to right, transparent 10%, black 30%, black 75%, transparent 90%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 30%, black 75%, transparent 90%)',
      }}>
        {/* Линейка с цифрами */}
        <div style={{
          position: 'absolute',
          top: '65%',
          left: `${rulerPosition}%`,
          transform: 'translate(-48.6%, -50%)',
          width: '100%',
          height: '20%',
          zIndex: 2,
          transition: 'left 0.5s ease-in-out',
        }}>
          <img 
            src={ruler} 
            alt="ruler" 
            style={{ 
              width: '100%', 
              height: '100%' 
            }} 
          />
          
          {/* Цифры */}
          <div style={{
            position: 'absolute',
            bottom: '200%',
            left: 0,
            width: '100%',
          }}>
            {numbers.map((number, index) => (
              <div 
                key={index}
                onClick={() => onNumberClick && onNumberClick(index)}
                style={{
                  ...numberStyles[getNumberState(index)],
                  position: 'absolute',
                  left: numberPosition(index),
                  transform: 'translateX(-50%)',
                  fontSize: '20px',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                }}
              >
                {formatNumber(number)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scale;