const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3300;

app.use(cors());

// URL главного сервера (можно вынести в конфиг)
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL || 'http://192.168.0.63:3001';

// Прокси для получения текущих пользователей
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(`${MAIN_SERVER_URL}/api/users`);
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка прокси пользователей:', error.message);
        res.status(500).json({ error: 'Не удалось получить пользователей' });
    }
});

// Получение количества пользователей за последние 24 часа с главного сервера
app.get('/api/daily-count', async (req, res) => {
    try {
        const response = await axios.get(`${MAIN_SERVER_URL}/api/users/daily-archived`);
        const archivedUsers = response.data;
        
        // Подсчитываем уникальных пользователей за последние 24 часа
        const uniqueUsers = new Set();
        archivedUsers.forEach(user => {
            const userId = user.idTab || user._id;
            if (userId) {
                uniqueUsers.add(userId);
            }
        });
        
        res.json({ count: uniqueUsers.size });
    } catch (error) {
        console.error('Ошибка получения количества пользователей за день:', error.message);
        res.status(500).json({ error: 'Не удалось получить количество' });
    }
});

// Новый endpoint для получения архивных пользователей за последние 24 часа
app.get('/api/daily-archived', async (req, res) => {
    try {
        const response = await axios.get(`${MAIN_SERVER_URL}/api/users/daily-archived`);
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка получения архивных пользователей:', error.message);
        res.status(500).json({ error: 'Не удалось получить архивных пользователей' });
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
    console.log(`Подключение к главному серверу: ${MAIN_SERVER_URL}`);
});