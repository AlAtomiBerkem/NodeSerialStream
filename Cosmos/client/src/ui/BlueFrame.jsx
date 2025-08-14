import React from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from "./FaidIn.jsx";
import CountdownTimer from '../components/CountdownTimer.jsx';
import ProcessingScreen from '../components/ProcessingScreen.jsx';
import { useCountdown } from '../context/CountdownContext.jsx';
import { uploadPhoto } from '../services/photoService.js';

const BlueFrame = ({ webcamRef }) => {
  const navigate = useNavigate();
  const { 
    isCountdownActive, 
    isProcessing, 
    isUploading,
    startCountdown, 
    startProcessing, 
    stopProcessing,
    startUploading,
    stopUploading,
    setResult,
    setError
  } = useCountdown();

  const handleCaptureClick = () => {
    startCountdown();
  };

  const handleCountdownComplete = async () => {
    console.log('Отсчет завершен, делаем снимок...');
    
    try {
      const photo = webcamRef.current?.capturePhoto?.();
      if (!photo) {
        throw new Error('Не удалось получить снимок с камеры');
      }
      startUploading();
      const result = await uploadPhoto(photo, '1');
      console.log('Фото отправлено на сервер:', result);
      
      setResult(result);
      startProcessing();
      
    } catch (error) {
      console.error('Ошибка при отправке фото:', error);
      setError(error.message);
      stopUploading();
    }
  };

  const handleProcessingComplete = () => {
    console.log('Обработка завершена!');
    stopProcessing();
    stopUploading();
    navigate('/three');
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
          disabled={isCountdownActive || isProcessing || isUploading}
        >
          <img 
            src="/btn-add-photo.png" 
            className="w-auto h-auto max-w-full max-h-full"
            alt="Сделать снимок"
          />
        </button>
      </FadeIn>

      <CountdownTimer 
        isActive={isCountdownActive}
        onComplete={handleCountdownComplete}
        duration={1000}
      />

      <ProcessingScreen 
        isVisible={isProcessing}
        onComplete={handleProcessingComplete}
        duration={3000}
      />
    </div>
  );
};

export default BlueFrame; 