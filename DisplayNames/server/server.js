const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3300;

app.use(cors());

// Хранение уникальных пользователей за день
let dailyUniqueUsers = new Set();
let currentDayStart = getDayStart();

// Получить начало текущего дня (00:00:00)
function getDayStart() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
}

// Проверить и сбросить счетчик при смене дня
function checkAndResetDailyCounter() {
    const now = getDayStart();
    if (now.getTime() !== currentDayStart.getTime()) {
        console.log('Новый день - сброс счетчика уникальных пользователей');
        dailyUniqueUsers.clear();
        currentDayStart = now;
    }
}

// Обновить список уникальных пользователей за день
function updateDailyUsers(users) {
    checkAndResetDailyCounter();
    
    users.forEach(user => {
        const userId = user._id || user.idTab;
        if (userId) {
            dailyUniqueUsers.add(userId);
        }
    });
}

app.get('/api/users', async (req, res) => {
    try {
        // в зависимости от того на какаом pc будет поднят сервер нужно юзать подходящий адресс
        const response = await axios.get('http://192.168.0.63:3001/api/users');
        const users = response.data;
        
        // Обновляем счетчик уникальных пользователей
        if (Array.isArray(users)) {
            updateDailyUsers(users);
        }
        
        res.json(users);
    } catch (error) {
        console.error('Ошибка прокси:', error.message);
        res.status(500).json({ error: 'Не удалось получить пользователей' });
    }
});

app.get('/api/daily-count', (req, res) => {
    try {
        checkAndResetDailyCounter();
        res.json({ count: dailyUniqueUsers.size });
    } catch (error) {
        console.error('Ошибка получения количества пользователей за день:', error.message);
        res.status(500).json({ error: 'Не удалось получить количество' });
    }
});

// Проверка смены дня каждую минуту
setInterval(checkAndResetDailyCounter, 60000);

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});