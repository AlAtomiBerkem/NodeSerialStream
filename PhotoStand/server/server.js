import express from 'express';
import cors from 'cors';
import axios from 'axios';
import QRCode from 'qrcode';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { watch } from 'chokidar';

const PORT = 4000;
const app = express();

// Конфигурация Яндекс.Диска
const YANDEX_OAUTH_TOKEN = 'y0_AgAAAAB4NNOlAAxRYwAAAAEOnM6dAACse6JJWJ9F2J6xQ33C6IrNvtEdRw';
const YANDEX_UPLOAD_URL = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const YANDEX_PUBLISH_URL = 'https://cloud-api.yandex.net/v1/disk/resources/publish';

// Локальные директории
const UPLOAD_DIR = './uploads/raw';
const PROCESSED_DIR = './uploads/processed';

// Создаем директории, если они не существуют
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(PROCESSED_DIR)) {
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Хранилище для ожидающих загрузок
const pendingUploads = new Map();

// Функция для загрузки файла на Яндекс.Диск
async function uploadToYandexDisk(filePath, filename) {
    try {
        console.log(`Начало загрузки ${filename} на Яндекс.Диск`);

        const yandexFilePath = `/Names/${filename}`;

        // 1. Получаем URL для загрузки
        const uploadResponse = await axios.get(YANDEX_UPLOAD_URL, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            },
            params: {
                path: yandexFilePath,
                overwrite: true
            }
        });

        const uploadUrl = uploadResponse.data.href;

        // 2. Загружаем файл
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath), { filename });

        await axios.put(uploadUrl, form, {
            headers: form.getHeaders()
        });

        // 3. Делаем файл публичным
        const publishResponse = await axios.put(YANDEX_PUBLISH_URL, null, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            },
            params: {
                path: yandexFilePath
            }
        });

        // 4. Получаем публичную ссылку
        const publicInfo = await axios.get(publishResponse.data.href, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            }
        });

        const downloadUrl = publicInfo.data.public_url;

        // 5. Генерируем QR-код
        const qrCode = await QRCode.toDataURL(downloadUrl);

        console.log(`Файл ${filename} успешно обработан`);

        return {
            success: true,
            filename,
            downloadUrl,
            qrCode
        };
    } catch (error) {
        console.error('Ошибка загрузки на Яндекс.Диск:', error);
        throw error;
    }
}

// Наблюдатель за папкой processed
const processedWatcher = watch(PROCESSED_DIR, {
    ignored: /(^|[\/\\])\../, // игнорируем скрытые файлы
    persistent: true,
    ignoreInitial: true // игнорируем существующие файлы при старте
});

processedWatcher.on('add', async (filePath) => {
    const filename = path.basename(filePath);
    console.log(`Обнаружен обработанный файл: ${filename}`);

    try {
        // Загружаем на Яндекс.Диск
        const result = await uploadToYandexDisk(filePath, filename);

        // Если есть ожидающий запрос - отвечаем
        if (pendingUploads.has(filename)) {
            const resolve = pendingUploads.get(filename);
            resolve(result);
            pendingUploads.delete(filename);
        }

        // Удаляем через 2 секунды
        setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Ошибка удаления ${filename}:`, err);
                } else {
                    console.log(`Файл ${filename} удален`);
                }
            });
        }, 2000);

    } catch (error) {
        console.error(`Ошибка обработки ${filename}:`, error);
        if (pendingUploads.has(filename)) {
            const resolve = pendingUploads.get(filename);
            resolve({
                success: false,
                error: 'Ошибка обработки фото'
            });
            pendingUploads.delete(filename);
        }
    }
});

// Обработчик загрузки фото
app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ success: false, error: 'Нет данных изображения' });
        }

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Сохраняем в raw
        const filename = `photo_${Date.now()}.jpg`;
        const rawFilePath = path.join(UPLOAD_DIR, filename);
        fs.writeFileSync(rawFilePath, buffer);

        console.log(`Файл ${filename} сохранен для обработки`);

        // Создаем Promise для ожидания обработки
        const uploadPromise = new Promise((resolve) => {
            pendingUploads.set(filename, resolve);
        });

        // Ждем обработки (таймаут 30 секунд)
        const result = await Promise.race([
            uploadPromise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Таймаут обработки')), 30000)
            )
        ]);

        res.json(result);

    } catch (error) {
        console.error('Ошибка загрузки:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Ошибка обработки фото'
        });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Отслеживается папка processed: ${path.resolve(PROCESSED_DIR)}`);
});