import { AnimatePresence, motion } from 'framer-motion';

const styleElement = document.createElement('style');
styleElement.innerHTML = `
  .question-text .highlight {
    color: #72D8FF;
  }
`;
document.head.appendChild(styleElement);

export const QuestionWindow = ({ currentQuestion }) => {
    const formatQuestionText = (text) => {
        const html = text.replace(
            /\[(.*?)\]/g,
            '<span class="highlight">$1</span>'
        );

        return `<div class="question-text">${html}</div>`;
    };

    return (
        <div
            style={{
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
                justifyContent: 'space-between',
            }}
        >
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
                        fontSize: '100px',
                        textAlign: 'center',
                        fontFamily: 'Akrobat, sans-serif',
                        fontWeight: 600,
                    }}
                >
                    <div
                        className="question-container"
                        dangerouslySetInnerHTML={{
                            __html: formatQuestionText(currentQuestion.text),
                        }}
                        style={{
                            display: 'inline-block',
                            textAlign: 'center',
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default QuestionWindow;
