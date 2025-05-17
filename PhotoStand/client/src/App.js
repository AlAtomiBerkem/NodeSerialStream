import { useState } from 'react';
import WebcamDisplay from './WebcamDisplay';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [downloadData, setDownloadData] = useState(null);

    const handleCapture = async (image) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image }),
            });
            const data = await response.json();
            setDownloadData(data);
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewPhoto = () => {
        setDownloadData(null);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen m-2">
            <h1 className="font-semibold text-3xl m-2">
                {isLoading ? 'Отправка...' : downloadData ? 'скачайте по QR-код' : 'Smile! 📷'}
            </h1>

            {downloadData ? (
                <div className="flex flex-col items-center">
                    <img src={downloadData.qrCode} alt="QR Code" className="w-64 h-64 mb-4" />
                    <p className="mb-4">Отсканируйте QR-код для скачивания фото</p>
                    <button
                        onClick={handleNewPhoto}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Сделать новое фото
                    </button>
                </div>
            ) : (
                <WebcamDisplay onCapture={handleCapture} isLoading={isLoading} />
            )}
        </div>
    );
}

export default App;