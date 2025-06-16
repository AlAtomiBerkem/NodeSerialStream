import { useState } from 'react';
import returnToStart from '../UI/backdrops/ReturnToStart.png';

import ConnectionTab from '../screens/ConnectionTab';
import StartScreen from '../components/TestingStart';

import yesActiv from '../UI/quizReturnStart/yesBtnActiv.png';
import yesPushed from '../UI/quizReturnStart/yesBtnPushed.png';
import noActive from '../UI/quizReturnStart/noBtnActiv.png';
import noPushed from '../UI/quizReturnStart/noBtnPushed.png';
import backPushed from '../UI/quizReturnStart/backBtnPushed.png';
import backActive from '../UI/quizReturnStart/backBtnActiv.png';
import ButtonQuiz from '../helpers/ButtonQuiz';

const ReturnScreen = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [nextComponent, setNextComponent] = useState(null);

    const handleButtonClick = (buttonType) => {
        if (activeButton) return;

        setActiveButton(buttonType);

        setTimeout(() => {
            setActiveButton(null);
            if (buttonType === 'yes' || buttonType === 'back') {
                setNextComponent('connection');
            } else if (buttonType === 'no') {
                setNextComponent('quiz');
            }
        }, 200);
    };

    if (nextComponent === 'connection') return <ConnectionTab />;
    if (nextComponent === 'quiz') return <StartScreen />;

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${returnToStart})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
            }}
        >
            <ButtonQuiz
                top="9.1%"
                left="10.3%"
                activeImg={backPushed}
                inactiveImg={backActive}
                onClick={() => handleButtonClick('back')}
                isActive={activeButton === 'back'}
                alt="Back button"
            />

            <ButtonQuiz
                top="72%"
                left="57.9%"
                activeImg={noPushed}
                inactiveImg={noActive}
                onClick={() => handleButtonClick('no')}
                isActive={activeButton === 'no'}
                alt="No option"
            />

            <ButtonQuiz
                top="72%"
                left="42.1%"
                activeImg={yesPushed}
                inactiveImg={yesActiv}
                onClick={() => handleButtonClick('yes')}
                isActive={activeButton === 'yes'}
                alt="Yes option"
            />
        </div>
    );
};

export default ReturnScreen;
