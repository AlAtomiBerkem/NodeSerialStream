import {
    frame1,
    automatBerecosa,
    QuizColorSelect,
    ButtonQuiz,
    partBtn,
    partBtnActive,
    QuizeExit,
} from './imports';

import { useDispatch, useSelector } from 'react-redux';
import {
    setColor,
    selectCombinedSelection,
} from '../../store/slices/selectionSlice';
import { useState } from 'react';

const ModelTho = () => {
    const [isButtonPushed, setIsButtonPushed] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const dispatch = useDispatch();
    const combinedSelection = useSelector(selectCombinedSelection);

    const handleAnswer = () => {
        console.log('Пользователь подтвердил выбор');
        setIsButtonPushed(true);

        setTimeout(() => {
            setIsButtonPushed(false);
            setShowComponent(true);
            console.log('Финальный выбор пользователя:', combinedSelection);
        }, 200);
    };

    const handleColorSelect = (colorId) => {
        console.log('Пользователь выбрал цвет:', colorId);
        dispatch(setColor(colorId));
    };

    if (showComponent) {
        return <QuizeExit />;
    }

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
                    transform: 'translate(-50%, -50%)',
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

export default ModelTho;
