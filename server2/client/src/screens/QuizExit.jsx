import React from 'react';
import quizExit from '../UI/backdrops/exitQuiz.png'

const QuizExit = () => {
    return (
        <div>
                  <div 
                    style={{
                      width: '100vw',
                      height: '100vh',
                      backgroundImage: `url(${quizExit})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  ></div>
        </div>
    );
};

export default QuizExit;