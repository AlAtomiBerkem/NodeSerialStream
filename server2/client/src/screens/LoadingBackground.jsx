import laodBackground from '../UI/backdrops/qqq.png'


export const LoadingBackground = () => {
    return(
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${laodBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    )
}

export default LoadingBackground;