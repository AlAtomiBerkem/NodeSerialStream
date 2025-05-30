import { AnimatePresence, motion } from 'framer-motion';

export const QuestionWindow = ({ 
  currentQuestion, 
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '60%',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Анимированный контент вопроса */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            textAlign: 'center'
          }}
        >
          {currentQuestion.text}
        </motion.div>
      </AnimatePresence>

      {/* Кнопки управления (можно вынести в отдельный компонент) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px'
      }}>
    
      </div>
    </div>
  );
};

export default QuestionWindow;