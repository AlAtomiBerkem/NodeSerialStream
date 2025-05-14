export const StandbyScreen = ({ onStart }) => {
    return (
        <div className="standby-screen">
            <div className="promo-content">
                <h2>Фотостенд</h2>
                <p>Нажмите кнопку, чтобы сделать фото</p>
                <button onClick={onStart} className="start-button">
                    Начать
                </button>
            </div>
        </div>
    );
};

export default StandbyScreen;