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

// Создаем директории
[UPLOAD_DIR, PROCESSED_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

app.use(cors());
app.use(express.json());

// очередь
const processingQueue = [];
let isProcessing = false;

async function uploadToYandex(filePath) {
    const filename = path.basename(filePath);
    const ext = path.extname(filename);
    const yandexName = `photo_${Date.now()}${ext}`;

    try {
        // 1. Получаем URL для загрузки
        const { data: { href: uploadUrl } } = await axios.get(YANDEX_UPLOAD_URL, {
            headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` },
            params: { path: `/Names/${yandexName}`, overwrite: true }
        });

        // 2. Загружаем файл
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        await axios.put(uploadUrl, form, { headers: form.getHeaders() });

        // 3. Публикуем файл
        const { data: { href: publishUrl } } = await axios.put(YANDEX_PUBLISH_URL, null, {
            headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` },
            params: { path: `/Names/${yandexName}` }
        });

        // 4. Получаем публичную ссылку
        const { data: { public_url: downloadUrl } } = await axios.get(publishUrl, {
            headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` }
        });

        // 5. Генерируем QR-код
        const qrCode = await QRCode.toDataURL(downloadUrl);

        return { success: true, downloadUrl, qrCode };
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        throw error;
    }
}

// Обработчик новых файлов
async function processFile(filePath) {
    try {
        const result = await uploadToYandex(filePath);

        // Ждем 2 секунды перед удалением
        await new Promise(resolve => setTimeout(resolve, 2000));
        fs.unlinkSync(filePath);

        return result;
    } catch (error) {
        console.error('Ошибка обработки файла:', error);
        throw error;
    }
}

// Наблюдатель за папкой processed
const watcher = watch(PROCESSED_DIR, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher.on('add', filePath => {
    processingQueue.push(filePath);
    if (!isProcessing) processQueue();
});

// Обработка очереди
async function processQueue() {
    if (isProcessing || processingQueue.length === 0) return;

    isProcessing = true;
    const filePath = processingQueue.shift();

    try {
        const result = await processFile(filePath);
        // Отправляем результат первому ожидающему клиенту
        if (pendingClients.length > 0) {
            const resolve = pendingClients.shift();
            resolve(result);
        }
    } catch (error) {
        console.error('Ошибка в очереди обработки:', error);
    } finally {
        isProcessing = false;
        processQueue();
    }
}

// Очередь клиентов
const pendingClients = [];

// Обработчик загрузки фото
app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).json({ error: 'No image data' });

        // Определяем формат (PNG или JPG) из Base64
        const formatMatch = image.match(/^data:image\/(\w+);base64,/);
        if (!formatMatch) {
            return res.status(400).json({ error: 'Invalid image format (expected PNG/JPG)' });
        }

        const imageFormat = formatMatch[1].toLowerCase(); // 'png' или 'jpeg'
        const validFormats = ['png', 'jpeg', 'jpg'];
        if (!validFormats.includes(imageFormat)) {
            return res.status(400).json({ error: 'Only PNG and JPG are supported' });
        }

        // Сохраняем в исходном формате
        const filename = `photo_${Date.now()}.${imageFormat === 'jpeg' ? 'jpg' : imageFormat}`;
        const filePath = path.join(UPLOAD_DIR, filename);
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        fs.writeFileSync(filePath, buffer);

        // Ждем обработки (макс 30 сек)
        const result = await Promise.race([
            new Promise(resolve => pendingClients.push(resolve)),
            new Promise((_, reject) => setTimeout(() => reject('Timeout'), 30000))
        ]);

        res.json(result);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        res.status(500).json({ error: error.message || 'Upload failed' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Ожидаем файлы в: ${path.resolve(PROCESSED_DIR)}`);
});