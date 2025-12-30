import { useEffect, useRef } from 'react';

/**
 * Хук для отслеживания бездействия пользователя.
 * @param onIdle - функция, вызываемая по истечении времени бездействия.
 * @param timeout - время бездействия в миллисекундах (по умолчанию 2 минуты).
 */
export const useIdleTimer = (onIdle: () => void, timeout: number = 120000) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            onIdle();
        }, timeout);
    };

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        const handleActivity = () => {
            resetTimer();
        };

        // Инициализация первого таймера
        resetTimer();

        // Добавляем слушатели событий на окно
        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            // Очистка при размонтировании
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [onIdle, timeout]);
};
