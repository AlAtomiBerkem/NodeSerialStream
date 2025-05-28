import errorTabBackdrop from '../UI/backdrops/errorTabBackdrop.svg'


export const ErrorComponent = () => {
  return (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${errorTabBackdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default ErrorComponent;