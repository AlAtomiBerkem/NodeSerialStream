import vector from '../../UI/quizeParts/Vector.png'
import vectorSelect from '../../UI/quizeParts/VectorSelect.png'

const QuizColorSelect = () => {
    return (
        <div>
             <ButtonQuiz
                      top="89%"
                      left="76%"
                      activeImg={vector}
                      inactiveImg={vectorSelect}
                    //   onClick={() => handleAnswer(true)}
                    //   isActive={isButtonPushed}
                      alt="True option"
                    />
             <ButtonQuiz
                      top="89%"
                      left="76%"
                      activeImg={vector}
                      inactiveImg={vectorSelect}
                    //   onClick={() => handleAnswer(true)}
                    //   isActive={isButtonPushed}
                      alt="True option"
                    />
             <ButtonQuiz
                      top="89%"
                      left="76%"
                      activeImg={vector}
                      inactiveImg={vectorSelect}
                    //   onClick={() => handleAnswer(true)}
                    //   isActive={isButtonPushed}
                      alt="True option"
                    />
        </div>
    );
};

export default QuizColorSelect;