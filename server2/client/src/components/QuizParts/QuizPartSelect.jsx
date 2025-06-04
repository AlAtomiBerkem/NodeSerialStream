import React from 'react';
import partScreen from '../../UI/quizeParts/partScreen.png'
import {fontStyles} from '../../helpers/fontStyle'
improt 

const QuizPartSelect = () => {
    return (
                <div>
                  <style>{fontStyles}</style>
                  
                  <div
                    style={{
                      width: '100vw',
                      height: '100vh',
                      backgroundImage: `url(${partScreen})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'relative',
                    }}
                  ></div>
        </div>
    );
};

export default QuizPartSelect;