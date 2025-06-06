import React, { useState } from 'react';
import partScreen from '../../UI/quizeParts/partScreen.png';
import { fontStyles } from '../../helpers/fontStyle';
import ButtonQuiz from '../../helpers/ButtonQuiz';
import ilushin52 from '../../UI/quizeParts/ilushin52.png';
import model2Icon from '../../UI/quizeParts/sy43.png';
import model3Icon from '../../UI/quizeParts/ty91.png';
import ModelOne from './ModelOne';
import ModelTwo from './ModelTho';
import ModelThree from './ModelThree';

const QuizPartSelect = () => {
    const [selectedModel, setSelectedModel] = useState(1);
    const [isButtonPushed, setIsButtonPushed] = useState(null);

    const handleModelSelect = (modelId) => {
        setIsButtonPushed(modelId);
        setTimeout(() => {
            setIsButtonPushed(null);
            setSelectedModel(modelId);
        }, 200);
    };

    const renderModel = () => {
        switch(selectedModel) {
            case 1: return <ModelOne />;
            case 2: return <ModelTwo />;
            case 3: return <ModelThree />;
            default: return null;
        }
    };

    return (
        <div>
            <style>{fontStyles}</style>
            
             <ButtonQuiz
                top="18.5%"
                left="24.64%"
                activeImg={ilushin52}
                inactiveImg={ilushin52}
                onClick={() => handleModelSelect(1)}
                isActive={isButtonPushed === 1}
                alt="Model 1"
            />
            
            <ButtonQuiz
                top="18.5%"
                left="50%"
                activeImg={model2Icon}
                inactiveImg={model2Icon}
                onClick={() => handleModelSelect(2)}
                isActive={isButtonPushed === 2}
                alt="Model 2"
            />
            
            <ButtonQuiz
                top="18.5%"
                left="75.5%"
                activeImg={model3Icon}
                inactiveImg={model3Icon}
                onClick={() => handleModelSelect(3)}
                isActive={isButtonPushed === 3}
                alt="Model 3"
            />

            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: `url(${partScreen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0
                }}
            >
                {renderModel()}
            </div>
        </div>
    );
};

export default QuizPartSelect;