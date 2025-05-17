import express from 'express';
import cors from 'cors';
import axios from 'axios';
import QRCode from 'qrcode';
import FormData from 'form-data';
import fs from 'fs';

const PORT = 4000;
const app = express();

// Конфигурация Яндекс.Диска
const YANDEX_OAUTH_TOKEN = 'y0_AgAAAAB4NNOlAAxRYwAAAAEOnM6dAACse6JJWJ9F2J6xQ33C6IrNvtEdRw';
const YANDEX_UPLOAD_URL = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const YANDEX_PUBLISH_URL = 'https://cloud-api.yandex.net/v1/disk/resources/publish';

app.use(cors());
app.use(express.json());

app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).send('No image data');

         const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

         const filename = `photo_${Date.now()}.jpg`;
        const filePath = `/Names/${filename}`;

         const uploadResponse = await axios.get(YANDEX_UPLOAD_URL, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            },
            params: {
                path: filePath,
                overwrite: true
            }
        });

        const uploadUrl = uploadResponse.data.href;

        const form = new FormData();
        form.append('file', buffer, { filename });

        await axios.put(uploadUrl, form, {
            headers: form.getHeaders()
        });

        // 3. Делаем файл публичным
        const publishResponse = await axios.put(YANDEX_PUBLISH_URL, null, {
            headers: {
                'Authorization': `OAuth ${YANDEX_OAUTH_TOKEN}`
            },
            params: {
                path: filePath
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