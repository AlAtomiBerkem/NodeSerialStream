import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3500;
const app = express();

// Создаём папку для фото при запуске
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir)); // Делаем папку статической

app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).send('No image data');

        // Удаляем префикс base64
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Генерируем уникальное имя файла
        const filename = `photo_${Date.now()}.jpg`;
        const filePath = path.join(uploadsDir, filename);

        // Сохраняем файл
        fs.writeFileSync(filePath, buffer);

        // Генерируем URL для скачивания
        const downloadUrl = `http://localhost:${PORT}/uploads/${filename}`;

        // Генерируем QR-код
        const qrCode = await QRCode.toDataURL(downloadUrl);

        res.json({
            success: true,
            filename,
            downloadUrl,
            qrCode
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Upload failed');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Фото сохраняются в: ${uploadsDir}`);
});