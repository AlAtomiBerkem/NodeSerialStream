import React, { useState, useEffect } from 'react';
import WhiteFrame from '../ui/WhiteFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx';
import { useCountdown } from '../context/CountdownContext.jsx';

const ThreeScreen = () => {
    const [showProcessedImage, setShowProcessedImage] = useState(false);
    const [processedImageUrl, setProcessedImageUrl] = useState(null);
    const { uploadResult } = useCountdown();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (uploadResult && uploadResult.filename) {
                try {
                    const response = await fetch(`http://localhost:4500/check-status/${uploadResult.filename}`);
                    const data = await response.json();
                    
                    if (data.status === 'ready') {
                        setProcessedImageUrl(`http://localhost:4500/uploads/processed/${uploadResult.filename}`);
                        setShowProcessedImage(true);
                    } else {
                        console.log('Файл еще обрабатывается...');
                    }
                } catch (error) {
                    console.error('Ошибка при проверке статуса:', error);
                }
            } else {
                setProcessedImageUrl('http://localhost:4500/uploads/processed/image.png');
                setShowProcessedImage(true);
            }
        },2000);

        return () => clearTimeout(timer);
    }, [uploadResult]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-done-bg"></div>
            
            {showProcessedImage && processedImageUrl && (
                <FaidIn delay={0}>
                    <img 
                        src={processedImageUrl}
                        alt="Обработанное изображение"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onError={(e) => {
                            console.error('Ошибка загрузки изображения:', e);
                            setShowProcessedImage(false);
                        }}
                    />
                </FaidIn>
            )}
            <FaidIn> 
                <WhiteFrame /> 
            </FaidIn>
        </div>
    )
}

export default ThreeScreen;