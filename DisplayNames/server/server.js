const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Чтобы React мог стучаться на этот сервер

const app = express();
const PORT = 3300;

app.use(cors());

// Проксируем запросы к /api/users на другой сервер
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/users');
        res.json(response.data); // Отправляем данные в React
    } catch (error) {
        console.error('Ошибка прокси:', error.message);
        res.status(500).json({ error: 'Не удалось получить пользователей' });
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});