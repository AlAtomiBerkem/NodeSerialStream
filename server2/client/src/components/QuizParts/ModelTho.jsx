import {useState} from 'react';
import frame1 from '../../UI/quizeParts/Frame1.png';
import automatBerecosa from '../../UI/quizeParts/vinty.png';
import QuizColorSelect from './QuizColorSelect';
import ButtonQuiz from '../../helpers/ButtonQuiz';

import partBtn from '../../UI/quizeParts/partBtn.png';
import partBtnActive from '../../UI/quizeParts/partBtnPushed.png';


const ModelOne = () => {
    const [isButtonPushed, setIsButtonPushed] = useState(false);
  const [showComponent, setShowComponent] = useState(false)

  const handleAnswer = (answer) => {
    setIsButtonPushed(true);
    
    setTimeout(() => {
      setIsButtonPushed(false);
      setShowComponent(true)
       console.log('Ответ принят:', answer);
    }, 200);
  };

    const handleColorSelect = (colorId) => {
        console.log('Selected color for Model 1:', colorId);
    };

    return (
        <div>
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
            </div>
            
            <QuizColorSelect onColorSelect={handleColorSelect} />

          <ButtonQuiz
          top="88%"
          left="71.6%"
          activeImg={partBtn}
          inactiveImg={partBtnActive}
          onClick={() => handleAnswer(true)}
          isActive={isButtonPushed}
          alt="True option"
        />

        </div>
    );
};

export default ModelOne;