import express from 'express';
import cors from 'cors';
import axios from 'axios';
import QRCode from 'qrcode';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const PORT = 4000;
const app = express();

const YANDEX_OAUTH_TOKEN = 'y0_AgAAAAB4NNOlAAxRYwAAAAEOnM6dAACse6JJWJ9F2J6xQ33C6IrNvtEdRw';
const YANDEX_UPLOAD_URL = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const YANDEX_PUBLISH_URL = 'https://cloud-api.yandex.net/v1/disk/resources/publish';

// сначала отправляется в raw затем готовое фото в processed
const UPLOAD_DIR = './uploads/raw';
const PROCESSED_DIR = './uploads/processed';

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(PROCESSED_DIR)) {
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).send('No image data');

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Сохраняем оригинальное изображение в raw
        const filename = `photo_${Date.now()}.jpg`;
        const rawFilePath = path.join(UPLOAD_DIR, filename);

        fs.writeFileSync(rawFilePath, buffer);

        // Для примера просто ждем 2 секунды и копируем файл в processed
        await new Promise(resolve => setTimeout(resolve, 2000));
        const processedFilePath = path.join(PROCESSED_DIR, filename);
        fs.copyFileSync(rawFilePath, processedFilePath);

        // Загружаем обработанный файл на Яндекс.Диск
        const yandexFilePath = `/Names/${filename}`;

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

        const form = new FormData();
        form.append('file', fs.createReadStream(processedFilePath), { filename });

        await axios.put(uploadUrl, form, {
            headers: form.getHeaders()
        });

        const publishResponse = await axios.put(YANDEX_PUBLISH_URL, null, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            },
            params: {
                path: yandexFilePath
            }
        });

        const publicInfo = await axios.get(publishResponse.data.href, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            }
        });

        const downloadUrl = publicInfo.data.public_url;

        const qrCode = await QRCode.toDataURL(downloadUrl);

        res.json({
            success: true,
            filename,
            downloadUrl,
            qrCode
        });
    } catch (error) {
        console.error('Upload error:', error.response?.data || error.message);
        res.status(500).send('Upload failed');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});