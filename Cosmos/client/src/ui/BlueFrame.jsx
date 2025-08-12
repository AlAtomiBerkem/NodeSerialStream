import React, { useRef } from 'react';
import FadeIn from "./FaidIn";
import CountdownTimer from '../components/CountdownTimer.jsx';
import ProcessingScreen from '../components/ProcessingScreen.jsx';
import { useCountdown } from '../context/CountdownContext.jsx';

const BlueFrame = () => {
  const { isCountdownActive, isProcessing, startCountdown, startProcessing, stopProcessing } = useCountdown();
  const webcamRef = useRef(null);

  const handleCaptureClick = () => {
    // Запускаем отсчет
    startCountdown();
  };

  const handleCountdownComplete = () => {
    // Отсчет завершен, делаем снимок
    console.log('Отсчет завершен, делаем снимок...');
    
    // Здесь можно добавить логику для получения снимка
    // const photo = webcamRef.current?.capturePhoto?.();
    
    // Запускаем обработку
    startProcessing();
  };

  const handleProcessingComplete = () => {
    // Обработка завершена
    console.log('Обработка завершена!');
    stopProcessing();
  };

  return (
    <div className="centered w-screen h-screen absolute inset-0 z-20 pointer-events-none">
      <img 
        src="/blue-frame.png" 
        className="w-full h-full max-w-[95%] max-h-[95%] object-contain"
      />
      
      <FadeIn delay={0.5}>
        <button 
          className="absolute p-0 border-none bg-transparent cursor-pointer pointer-events-auto top-[77.5%] left-[24%] hover:scale-105 transition-transform"
          onClick={handleCaptureClick}
          disabled={isCountdownActive || isProcessing}
        >
          <img 
            src="/btn-add-photo.png" 
            className="w-auto h-auto max-w-full max-h-full"
            alt="Сделать снимок"
          />
        </button>
      </FadeIn>

      {/* Компонент отсчета */}
      <CountdownTimer 
        isActive={isCountdownActive}
        onComplete={handleCountdownComplete}
        duration={1000}
      />

      {/* Компонент обработки */}
      <ProcessingScreen 
        isVisible={isProcessing}
        onComplete={handleProcessingComplete}
        duration={3000}
      />
    </div>
  );
};

export default BlueFrame;