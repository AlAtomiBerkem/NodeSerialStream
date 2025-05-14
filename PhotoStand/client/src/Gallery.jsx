import { useState } from "react";

export const Gallery = ({ faceImage, onBack }) => {
    const [selectedBg, setSelectedBg] = useState(null);
    const backgrounds = [
        { id: 1, url: '/backgrounds/1.jpg' },
        { id: 2, url: '/backgrounds/2.jpg' },
        { id: 3, url: '/backgrounds/3.jpg' },
    ];

    const handleSave = () => {
        // Отправка комбинированного изображения на сервер
        console.log('Сохраняем фото с фоном:', selectedBg);
    };

    return (
        <div className="gallery-container">
            <h2>Выберите фон</h2>

            <div className="preview-area">
                {selectedBg && (
                    <div className="combined-preview">
                        <img src={selectedBg.url} alt="Background" className="background" />
                        <img
                            src={`data:image/png;base64,${faceImage}`}
                            alt="Face"
                            className="face-overlay"
                        />
                    </div>
                )}
            </div>

            <div className="backgrounds-grid">
                {backgrounds.map(bg => (
                    <div
                        key={bg.id}
                        className={`bg-thumbnail ${selectedBg?.id === bg.id ? 'selected' : ''}`}
                        onClick={() => setSelectedBg(bg)}
                    >
                        <img src={bg.url} alt={`Background ${bg.id}`} />
                    </div>
                ))}
            </div>

            <div className="action-buttons">
                <button onClick={onBack} className="secondary-button">
                    Назад
                </button>
                <button
                    onClick={handleSave}
                    className="primary-button"
                    disabled={!selectedBg}
                >
                    Сохранить фото
                </button>
            </div>
        </div>
    );
};

export default Gallery;