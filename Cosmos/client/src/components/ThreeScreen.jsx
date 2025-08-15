import React, { useState, useEffect } from 'react';
import WhiteFrame from '../ui/WhiteFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx';
import { useCountdown } from '../context/CountdownContext.jsx';

const ThreeScreen = () => {
    const [showProcessedImage, setShowProcessedImage] = useState(false);
    const [processedImageUrl, setProcessedImageUrl] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const { uploadResult } = useCountdown();

    useEffect(() => {
        let isMounted = true;
        let intervalId;

        const pollNext = async () => {
            try {
                const response = await fetch('http://localhost:4500/processed/next');
                const data = await response.json();

                if (!isMounted) return;

                if (data.status === 'ready' && data.filename) {
                    setProcessedImageUrl(`http://localhost:4500/uploads/processed/${data.filename}`);
                    if (data.qrCode) setQrCode(data.qrCode);
                    setShowProcessedImage(true);
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error('Ошибка запроса обработанного файла:', error);
            }
        };

        pollNext();
        intervalId = setInterval(pollNext, 1500);

        return () => {
            isMounted = false;
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-done-bg"></div>
            
            {showProcessedImage && processedImageUrl && (
                <FaidIn delay={0}>
                    <img 
                        src={processedImageUrl}
                        alt="Обработанное изображение"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onLoad={async () => {
                            try {
                                const url = new URL(processedImageUrl);
                                const parts = url.pathname.split('/');
                                const filename = parts[parts.length - 1];
                                // Небольшая задержка, чтобы успели отсканировать QR
                                setTimeout(async () => {
                                    await fetch(`http://localhost:4500/processed/${filename}`, { method: 'DELETE' });
                                }, 3000);
                            } catch (e) {
                                console.error('Ошибка удаления файла после показа:', e);
                            }
                        }}
                        onError={(e) => {
                            console.error('Ошибка загрузки изображения:', e);
                            setShowProcessedImage(false);
                        }}
                    />
                    {qrCode && (
                        <img
                            src={qrCode}
                            alt="QR для загрузки"
                            className="absolute top-40 right-6 bottom-6 w-40 h-40 z-20 bg-white/10 p-2 rounded"
                        />
                    )}
                </FaidIn>
            )}
            <FaidIn> 
                <WhiteFrame /> 
            </FaidIn>
        </div>
    )
}

export default ThreeScreen;