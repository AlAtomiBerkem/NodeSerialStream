import React, { useState } from 'react';
import vector from '../../UI/quizeParts/Vector.png';
import vectorSelect from '../../UI/quizeParts/VectorSelect.png';
import Color from '../../UI/quizeParts/Color.png';

const QuizColorSelect = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(1);

  const colorButtons = [
    { id: 1, top: '64%', left: '60%' },
    { id: 2, top: '64%', left: '71.5%' },
    { id: 3, top: '64%', left: '83%' }
  ];

  const handleColorClick = (colorId) => {
    setSelectedColor(colorId);
    if (onColorSelect) onColorSelect(colorId);
  };

  return (
    <>
      {colorButtons.map((button) => (
        <div 
          key={button.id}
          onClick={() => handleColorClick(button.id)}
          style={{
            position: 'absolute',
            top: button.top,
            left: button.left,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{
            width: '186px',
            height: '105px',
            backgroundImage: `url(${Color})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <img 
              src={selectedColor === button.id ? vectorSelect : vector}
              alt=""
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default QuizColorSelect;