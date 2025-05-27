import testStartBackdrop from '../../UI/backdrops/testStartBackdrop.svg'

export const TestingStart = () => {
  return (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${testStartBackdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default TestingStart;  