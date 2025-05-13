const express = require('express');
const http = require('http');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());

// Подключение Socket.io
io.on('connection', (socket) => {
  console.log('Новое соединение установлено');

  // Функция для получения данных с основного сервера
  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.0.128:3001/api/users/');
      socket.emit('usersUpdated', { users: response.data });
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  // Запуск опроса основного сервера
  const intervalId = setInterval(fetchData, 3000);

  // Очистка интервала при отключении клиента
  socket.on('disconnect', () => {
    clearInterval(intervalId);
  });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});
