import express from 'express';
import cors from 'cors';
import axios from 'axios';
import QRCode from 'qrcode';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { watch } from 'chokidar';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 4500;
const app = express();

const processedFiles = new Map();

const YANDEX_OAUTH_TOKEN = process.env.YANDEX_OAUTH_TOKEN;
const YANDEX_UPLOAD_URL = process.env.YANDEX_UPLOAD_URL;
const YANDEX_PUBLISH_URL = process.env.YANDEX_PUBLISH_URL;

const UPLOAD_DIR = './uploads/raw';
const PROCESSED_DIR = './uploads/processed';

[UPLOAD_DIR, PROCESSED_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function withRetry(fn, maxRetries = 3, delayMs = 2000) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);

            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
                delayMs *= 0.5;
            }
        }
    }

    throw lastError;
}

async function uploadToYandex(filePath) {
    const filename = path.basename(filePath);
    const ext = path.extname(filename);
    const yandexName = `photo_${Date.now()}${ext}`;
    const yandexPath = `/Names/${yandexName}`;

    console.log(`Начало загрузки: ${filename} -> ${yandexPath}`);

    try {
        // 1. Получаем URL для загрузки
        const { data: { href: uploadUrl } } = await withRetry(async () => {
            const response = await axios.get(YANDEX_UPLOAD_URL, {
                headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` },
                params: { path: yandexPath, overwrite: true }
            });

            if (!response.data?.href) {
                throw new Error('Не получен URL для загрузки');
            }
            return response;
        });

        console.log(`Получен upload URL: ${uploadUrl}`);

        // 2. Загружаем файл
        await withRetry(async () => {
            const form = new FormData();
            form.append('file', fs.createReadStream(filePath));

            const uploadResponse = await axios.put(uploadUrl, form, {
                headers: form.getHeaders(),
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });

            console.log(`Файл загружен, статус: ${uploadResponse.status}`);
        });

        // 3. Публикуем файл
        const { data: { href: publishUrl } } = await withRetry(async () => {
            const response = await axios.put(YANDEX_PUBLISH_URL, null, {
                headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` },
                params: { path: yandexPath }
            });

            if (!response.data?.href) {
                throw new Error('Не получен URL публикации');
            }
            return response;
        });

        console.log(`Получен publish URL: ${publishUrl}`);

        // 4. Получаем публичную ссылку
        const { data: { public_url: downloadUrl } } = await withRetry(async () => {
            const response = await axios.get(publishUrl, {
                headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` }
            });

            if (!response.data?.public_url) {
                throw new Error('Не получена публичная ссылка');
            }
            return response;
        });

        console.log(`Публичная ссылка: ${downloadUrl}`);

        // 5. Генерация QR-кода с резервными механизмами
        let qrCode;
        try {
            if (!downloadUrl) {
                throw new Error('Пустая ссылка для QR-кода');
            }

            // Первая попытка - высокое качество
            try {
                qrCode = await QRCode.toDataURL(downloadUrl, {
                    errorCorrectionLevel: 'H',
                    margin: 2,
                    scale: 8
                });
            } catch (qrError) {
                console.warn('Ошибка генерации QR (HQ):', qrError.message);
                // Вторая попытка - упрощённые параметры
                qrCode = await QRCode.toDataURL(downloadUrl, {
                    errorCorrectionLevel: 'M',
                    scale: 4
                });
            }
        } catch (finalQrError) {
            console.error('Критическая ошибка генерации QR:', finalQrError);
            // Резервный вариант
            qrCode = await QRCode.toDataURL(
                downloadUrl
                    ? `Скачать: ${downloadUrl}`
                    : 'Ошибка генерации ссылки',
                { scale: 3 }
            );
        }

        console.log('Успешно сгенерирован QR-код');

        return {
            success: true,
            downloadUrl,
            qrCode,
            yandexPath,
            filename: path.basename(filePath)
        };
    } catch (error) {
        console.error('Ошибка загрузки:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });

        // Генерация QR-кода с информацией об ошибке
        let errorQrCode;
        try {
            errorQrCode = await QRCode.toDataURL(
                `Ошибка: ${error.message || 'Неизвестная ошибка'}`,
                { scale: 3 }
            );
        } catch (qrError) {
            errorQrCode = 'data:image/png;base64,iVBORw0KG...'; // Простая картинка с ошибкой
        }

        throw {
            ...error,
            isYandexError: true,
            qrCode: errorQrCode,
            filename: path.basename(filePath)
        };
    }
}

async function processFile(filePath) {
    try {
        const result = await uploadToYandex(filePath);
        await fs.promises.unlink(filePath);
        return result;
    } catch (error) {
        console.error('Ошибка обработки файла:', filePath, error);
        throw error;
    }
}

const processedWatcher = watch(PROCESSED_DIR, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

processedWatcher.on('add', async filePath => {
    try {
        const result = await processFile(filePath);
        // Сохраняем по всем возможным вариантам имен
        const filename = path.basename(filePath);
        processedFiles.set(filename, result);

        // Если имя было изменено (удален backgroundId)
        const cleanName = filename.replace(/^\[\d+\]/, '');
        if (cleanName !== filename) {
            processedFiles.set(cleanName, result);
        }

        console.log('Файл обработан:', filename);
    } catch (error) {
        console.error('Ошибка обработки:', error);
    }
});

app.post('/upload', async (req, res) => {
    try {
        const { image, backgroundId } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        const formatMatch = image.match(/^data:image\/(\w+);base64,/);
        if (!formatMatch) {
            return res.status(400).json({ error: 'Invalid image format' });
        }

        const imageFormat = formatMatch[1].toLowerCase();
        const validFormats = ['png', 'jpeg', 'jpg'];
        if (!validFormats.includes(imageFormat)) {
            return res.status(400).json({ error: 'Only PNG and JPG are supported' });
        }

        const filename = `[${backgroundId}]photo_${Date.now()}.${imageFormat === 'jpeg' ? 'jpg' : imageFormat}`;
        const filePath = path.join(UPLOAD_DIR, filename); // Сохраняем в raw
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        await fs.promises.writeFile(filePath, buffer);

        // Задержка 2 секунды перед ответом
        await new Promise(resolve => setTimeout(resolve, 2000));

        res.json({
            success: true,
            message: 'File saved to raw directory',
            filename,
            base64: image // Возвращаем base64 обратно
        });
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Upload failed'
        });
    }
});

app.get('/check-status/:filename', (req, res) => {
    const { filename } = req.params;
    const result = processedFiles.get(filename);

    if (result) {
        res.json({ status: 'ready', ...result });
    } else {
        res.json({ status: 'processing' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Ожидаем файлы в: ${path.resolve(PROCESSED_DIR)}`);
});