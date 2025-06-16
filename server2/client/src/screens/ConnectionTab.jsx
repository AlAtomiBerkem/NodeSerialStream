import backdropConnection from '../UI/backdrops/connectionTabBackdrop.png';

export const ConnectionTab = () => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${backdropConnection})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default ConnectionTab;
