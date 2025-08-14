const SERVER_URL = 'http://localhost:4500';

export const uploadPhoto = async (imageBase64, backgroundId = '1') => {
  try {
    const response = await fetch(`${SERVER_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
        backgroundId: backgroundId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка отправки фото:', error);
    throw error;
  }
};

export const checkPhotoStatus = async (filename) => {
  try {
    const response = await fetch(`${SERVER_URL}/check-status/${filename}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка проверки статуса:', error);
    throw error;
  }
};

export const capturePhotoFromWebcam = (webcamRef) => {
  if (!webcamRef.current) {
    console.error('Вебкамера не инициализирована');
    return null;
  }

  try {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  } catch (error) {
    console.error('Ошибка получения снимка:', error);
    return null;
  }
}; 