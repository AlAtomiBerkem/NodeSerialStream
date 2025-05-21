import { useState, useRef, useEffect } from 'react';
import './Slider.css';

import background_1 from '../assets/background_1.png';
import background_2 from '../assets/background_2.png';
import background_3 from '../assets/background_3.png';

export default function BackgroundScreen({ onSelect }) {
    const backgrounds = [
        { id: 1, url: background_1 },
        { id: 2, url: background_2 },
        { id: 3, url: background_3 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

     const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].clientX;
        const diff = startX - x;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextBackground();
            else prevBackground();
            setIsDragging(false);
        }
    };

    const endDrag = () => setIsDragging(false);

     const handleMouseDown = (e) => {
        setStartX(e.clientX);
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.clientX;
        const diff = startX - x;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextBackground();
            else prevBackground();
            setIsDragging(false);
        }
    };

     const nextBackground = () => {
        setCurrentIndex((prev) => (prev === backgrounds.length - 1 ? 0 : prev + 1));
    };

    const prevBackground = () => {
        setCurrentIndex((prev) => (prev === 0 ? backgrounds.length - 1 : prev - 1));
    };

     useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('touchstart', handleTouchStart);
            slider.addEventListener('touchmove', handleTouchMove);
            slider.addEventListener('touchend', endDrag);
            slider.addEventListener('mousedown', handleMouseDown);
            slider.addEventListener('mousemove', handleMouseMove);
            slider.addEventListener('mouseup', endDrag);
            slider.addEventListener('mouseleave', endDrag);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('touchstart', handleTouchStart);
                slider.removeEventListener('touchmove', handleTouchMove);
                slider.removeEventListener('touchend', endDrag);
                slider.removeEventListener('mousedown', handleMouseDown);
                slider.removeEventListener('mousemove', handleMouseMove);
                slider.removeEventListener('mouseup', endDrag);
                slider.removeEventListener('mouseleave', endDrag);
            }
        };
    }, [isDragging, startX]);

    return (
        <div className="slider-container">
            <h2 className="slider-title">Выберите фон</h2>

            <div className="slider-wrapper">
                <button
                    onClick={prevBackground}
                    className="slider-arrow slider-arrow-left"
                    aria-label="Предыдущий фон"
                >
                    ←
                </button>

                <div
                    className="slider"
                    ref={sliderRef}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {backgrounds.map((bg, index) => (
                        <div
                            key={bg.id}
                            className={`slide ${index === currentIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${bg.url})` }}
                            aria-hidden={index !== currentIndex}
                            aria-label={`Фон ${bg.id}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextBackground}
                    className="slider-arrow slider-arrow-right"
                    aria-label="Следующий фон"
                >
                    →
                </button>
            </div>

            <div className="slider-indicators">
                {backgrounds.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Перейти к фону ${index + 1}`}
                        aria-current={index === currentIndex}
                    />
                ))}
            </div>

            <button
                onClick={() => onSelect(backgrounds[currentIndex].url, backgrounds[currentIndex].id)}
                className="slider-select-button"
            >
                Выбрать этот фон
            </button>
        </div>
    );
}