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

const YANDEX_OAUTH_TOKEN = 'y0_AgAAAAB4NNOlAAxRYwAAAAEOnM6dAACse6JJWJ9F2J6xQ33C6IrNvtEdRw';
const YANDEX_UPLOAD_URL = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const YANDEX_PUBLISH_URL = 'https://cloud-api.yandex.net/v1/disk/resources/publish';

const UPLOAD_DIR = './uploads/raw';
const PROCESSED_DIR = './uploads/processed';

[UPLOAD_DIR, PROCESSED_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

app.use(cors());
app.use(express.json());

const processingQueue = [];
let isProcessing = false;
const pendingClients = [];

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

    try {
        const { data: { href: uploadUrl } } = await withRetry(async () => {
            const response = await axios.get(YANDEX_UPLOAD_URL, {
                headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` },
                params: { path: yandexPath, overwrite: true }
            });

            if (!response.data?.href) {
                throw new Error('No upload URL received');
            }

            return response;
        });

        await withRetry(async () => {
            const form = new FormData();
            form.append('file', fs.createReadStream(filePath));
            await axios.put(uploadUrl, form, {
                headers: form.getHeaders(),
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });
        });

        await new Promise(resolve => setTimeout(resolve, 3000));

        const { data: { href: publishUrl } } = await withRetry(async () => {
            const response = await axios.put(YANDEX_PUBLISH_URL, null, {
                headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` },
                params: { path: yandexPath }
            });

            if (!response.data?.href) {
                throw new Error('No publish URL received');
            }

            return response;
        });

        const { data: { public_url: downloadUrl } } = await withRetry(async () => {
            const response = await axios.get(publishUrl, {
                headers: { 'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}` }
            });

            if (!response.data?.public_url) {
                throw new Error('No public URL received');
            }

            return response;
        });

        const qrCode = await QRCode.toDataURL(downloadUrl);

        return { success: true, downloadUrl, qrCode };
    } catch (error) {
        console.error('Ошибка загрузки:', error.response?.data || error.message);
        throw error;
    }
}

async function processFile(filePath) {
    try {
        const result = await uploadToYandex(filePath);

        await fs.promises.unlink(filePath);

        return result;
    } catch (error) {
        console.error('Ошибка обработки файла:', filePath, error);

        const quarantineDir = path.join(UPLOAD_DIR, 'quarantine');
        if (!fs.existsSync(quarantineDir)) {
            fs.mkdirSync(quarantineDir, { recursive: true });
        }

        const newPath = path.join(quarantineDir, path.basename(filePath));
        await fs.promises.rename(filePath, newPath);

        throw error;
    }
}

const processedWatcher = watch(PROCESSED_DIR, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

processedWatcher.on('add', filePath => {
    processingQueue.push(filePath);
    if (!isProcessing) processQueue();
});

async function processQueue() {
    if (isProcessing || processingQueue.length === 0) return;

    isProcessing = true;
    const filePath = processingQueue.shift();

    try {
        const result = await processFile(filePath);

        if (pendingClients.length > 0) {
            const resolve = pendingClients.shift();
            resolve(result);
        }
    } catch (error) {
        console.error('Ошибка в очереди обработки:', error);

        if (pendingClients.length > 0) {
            const resolve = pendingClients.shift();
            resolve({
                success: false,
                error: error.message || 'Processing failed'
            });
        }
    } finally {
        isProcessing = false;
        processQueue();
    }
}

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
        const filePath = path.join(UPLOAD_DIR, filename);
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        await fs.promises.writeFile(filePath, buffer);

        res.json({ success: true, message: 'File saved to raw directory' });
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Upload failed'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Ожидаем файлы в: ${path.resolve(PROCESSED_DIR)}`);
});
