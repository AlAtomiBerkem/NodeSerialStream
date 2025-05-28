import testingDoneCaseBackdrop from '../UI/backdrops/testingDoneCaseBackdrop.svg'


export const TestingDone = () => {
    return(
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${testingDoneCaseBackdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    )
}

export default TestingDone;