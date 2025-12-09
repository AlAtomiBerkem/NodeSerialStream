const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3300;

app.use(cors());

const DATA_FILE = path.join(__dirname, 'dailyUsers.json');

let dailyUniqueUsers = new Set();
let currentDayStart = getDayStart();

function getDayStart() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
}

async function loadDailyUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const parsed = JSON.parse(data);
        
        const savedDate = new Date(parsed.date);
        const today = getDayStart();
        
        if (savedDate.getTime() === today.getTime()) {
            dailyUniqueUsers = new Set(parsed.userIds || []);
            currentDayStart = savedDate;
            console.log(`Загружено ${dailyUniqueUsers.size} уникальных пользователей за сегодня`);
        } else {
            console.log('Обнаружены данные за другой день - сброс счетчика');
            dailyUniqueUsers = new Set();
            currentDayStart = today;
            await saveDailyUsers();
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Файл с данными не найден, создается новый');
            dailyUniqueUsers = new Set();
            currentDayStart = getDayStart();
            await saveDailyUsers();
        } else {
            console.error('Ошибка загрузки данных:', error.message);
            dailyUniqueUsers = new Set();
            currentDayStart = getDayStart();
        }
    }
}

async function saveDailyUsers() {
    try {
        const data = {
            date: currentDayStart.toISOString(),
            userIds: Array.from(dailyUniqueUsers)
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка сохранения данных:', error.message);
    }
}

async function checkAndResetDailyCounter() {
    const now = getDayStart();
    if (now.getTime() !== currentDayStart.getTime()) {
        console.log('Новый день - сброс счетчика уникальных пользователей');
        dailyUniqueUsers.clear();
        currentDayStart = now;
        await saveDailyUsers();
    }
}

async function updateDailyUsers(users) {
    await checkAndResetDailyCounter();
    
    let hasChanges = false;
    users.forEach(user => {
        const userId = user._id || user.idTab;
        if (userId && !dailyUniqueUsers.has(userId)) {
            dailyUniqueUsers.add(userId);
            hasChanges = true;
        }
    });
    
    if (hasChanges) {
        await saveDailyUsers();
    }
}

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://192.168.0.63:3001/api/users');
        const users = response.data;
        

        if (Array.isArray(users)) {
            await updateDailyUsers(users);
        }
        
        res.json(users);
    } catch (error) {
        console.error('Ошибка прокси:', error.message);
        res.status(500).json({ error: 'Не удалось получить пользователей' });
    }
});

app.get('/api/daily-count', async (req, res) => {
    try {
        await checkAndResetDailyCounter();
        res.json({ count: dailyUniqueUsers.size });
    } catch (error) {
        console.error('Ошибка получения количества пользователей за день:', error.message);
        res.status(500).json({ error: 'Не удалось получить количество' });
    }
});

setInterval(() => {
    checkAndResetDailyCounter().catch(err => {
        console.error('Ошибка при проверке смены дня:', err.message);
    });
}, 60000);

loadDailyUsers().then(() => {
    app.listen(PORT, () => {
        console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Ошибка инициализации:', err.message);
    process.exit(1);
});