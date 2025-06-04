import React, { useState } from 'react';
import frame1 from '../../UI/quizeParts/Frame1.png';
import partBtn from '../../UI/quizeParts/partBtn.png';
import partBtnActive from '../../UI/quizeParts/partBtnPushed.png';
import ButtonQuiz from '../../helpers/ButoonQuiz';
import automatBerecosa from '../../UI/quizeParts/vinty.png'
import ilushin52 from '../../UI/quizeParts/ilushin52.png'

const Model1 = () => {
  const [isButtonPushed, setIsButtonPushed] = useState(false);

  const handleAnswer = (answer) => {
    setIsButtonPushed(true);
    
    setTimeout(() => {
      setIsButtonPushed(false);
       console.log('Ответ принят:', answer);
    }, 200);
  };

  return (
    <div>
        <ButtonQuiz
          top="18.5%"
          left="24.64%"
          activeImg={ilushin52}
          inactiveImg={ilushin52}
          onClick={() => handleAnswer(true)}
          isActive={isButtonPushed}
          alt="True option"
        />
      <div 
        style={{
          width: '81.5vw',
          height: '72.1vh',
          backgroundImage: `url(${frame1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: '58%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
              <div 
        style={{
          width: '700px',
          height: '650px',
          backgroundImage: `url(${automatBerecosa})`,
          top: '60%',
          left: '0%',
        }}
      ></div>
        <ButtonQuiz
          top="89%"
          left="76%"
          activeImg={partBtn}
          inactiveImg={partBtnActive}
          onClick={() => handleAnswer(true)}
          isActive={isButtonPushed}
          alt="True option"
        />
      </div>

    </div>
  );
};

export default Model1;