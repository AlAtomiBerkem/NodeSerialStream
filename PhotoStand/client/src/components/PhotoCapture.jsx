import { useState, useEffect } from "react";
import WebcamDisplay from "./WebcamDisplay";
import path from "path-browserify";

export const PhotoCapture = ({ backgroundId, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState(null);
  const [error, setError] = useState(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [currentFilename, setCurrentFilename] = useState(null);

  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setHasCamera(true);
      } catch (err) {
        setHasCamera(false);
      }
    };

    checkCameraAvailability();
  }, []);

  useEffect(() => {
    if (!currentFilename) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/check-status/${currentFilename}`,
        );
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();

        if (data.status === "ready") {
          if (!data.qrCode) {
            throw new Error("QR код не сгенерирован");
          }
          setDownloadData(data);
          setIsLoading(false);
        } else {
          setTimeout(checkStatus, 1000);
        }
      } catch (error) {
        console.error("Ошибка проверки статуса:", error);
        setError(`Ожидание QR-кода... (${error.message})`);
        setTimeout(checkStatus, 2000); // Продолжаем попытки
      }
    };

    const timer = setTimeout(checkStatus, 500);
    return () => clearTimeout(timer);
  }, [currentFilename]);

  const handleCapture = async (image) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          backgroundId,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки фотографии");
      }

      const data = await response.json();
      setCurrentFilename(data.filename);
    } catch (error) {
      console.error(error);
      setError(error.message || "Произошла ошибка при загрузке фотографии");
      setIsLoading(false);
    }
  };

  const handleNewPhoto = () => {
    setDownloadData(null);
    setError(null);
    setCurrentFilename(null);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-2">
      <h1 className="font-semibold text-3xl m-2">
        {isLoading
          ? "Обработка фото..."
          : downloadData
            ? "Скачайте по QR-коду"
            : "Smile! 📷"}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!hasCamera ? (
        <p className="text-red-500">Камера недоступна</p>
      ) : downloadData ? (
        <div className="flex flex-col items-center">
          <img
            src={downloadData.qrCode}
            alt="QR Code"
            className="w-64 h-64 mb-4"
          />
          <p className="mb-4">Отсканируйте QR-код для скачивания фото</p>
          <div className="flex gap-2">
            <button
              onClick={handleNewPhoto}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Сделать новое фото
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Выбрать другой фон
            </button>
          </div>
        </div>
      ) : (
        <WebcamDisplay onCapture={handleCapture} isLoading={isLoading} />
      )}
    </div>
  );
};

export default PhotoCapture;
