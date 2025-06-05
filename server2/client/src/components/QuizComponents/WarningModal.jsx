import warning from '../../UI/warning/warningQuiz.png'
 import akrobatSemibold from '../../UI/Fonts/Acrobat/akrobat-semibold.woff2';
 import akrobatSemiboldWoff from '../../UI/Fonts/Acrobat/akrobat-semibold.woff';


 export const fontStyles = `
  @font-face {
    font-family: 'Akrobat';
    src: url(${akrobatSemibold}) format('woff2'),
         url(${akrobatSemiboldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;

const WarningModal = ({ missedQuestions }) => (
  <div style={{
    position: 'fixed',
    top: 250,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none'
  }}>
    <div style={{
      position: 'relative',
      textAlign: 'center',
      pointerEvents: 'auto'
    }}>
      <img
        src={warning}
        alt="Warning"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        color: 'white',
        fontFamily: 'Akrobat, sans-serif',
      }}>
        <div style={{ marginBottom: '70px' }}></div>
        <div style={{
          top: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          {missedQuestions.map(id => (
            <div
              key={id}
              style={{
                padding: '0px 5px',
                color: '#a1a1a1',
                fontSize: '24px',
                fontFamily: 'Akrobat, sans-serif',
              }}
            >
              [{String(id + 1).padStart(2, '0')}]
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default WarningModal;