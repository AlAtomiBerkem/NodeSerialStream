const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", // Разрешить все источники (в продакшене укажите конкретный домен)
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Сервер доступен по локальной сети!');
});

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://10.0.0.128:3001/api/users/');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Обработка WebSocket соединений
io.on('connection', (socket) => {
  console.log('Новое соединение:', socket.id);

  // Отправляем текущий список пользователей при подключении
  socket.emit('users', getCurrentUsers());

  // Обработка удаления пользователя
  socket.on('userDeleted', (userId) => {
    io.emit('userDeleted', userId); // Уведомляем всех клиентов об удалении пользователя
  });
});

function getCurrentUsers() {
  // Здесь должна быть логика получения текущих пользователей из базы данных
  return [];
}

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на локальном хосте: http://localhost:${PORT}`);
  console.log(`Доступен в локальной сети по адресу: http://10.0.0.128:${PORT}`);
});
