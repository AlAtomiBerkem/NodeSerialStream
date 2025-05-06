const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/config');
const { Server } = require('socket.io'); // <-- Импортируем Socket.IO
const app = express();
const server = http.createServer(app); // HTTP-сервер для Express + Socket.IO
const userRoutes = require('./routes/userRouter');
const standRoutes = require('./routes/standRouter');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3100'],
}));

// Инициализируем Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3100'],
    methods: ['GET', 'POST'],
  },
});

// Обработка подключений Socket.IO
io.on('connection', (socket) => {
  console.log(`🔌 Новый клиент подключён (ID: ${socket.id})`);

  // Пример: Отправка сообщения всем клиентам
  socket.on('chat_message', (msg) => {
    console.log(`📩 Получено сообщение: ${msg}`);
    io.emit('chat_message', `Сервер получил: ${msg}`); // Отправляем всем
  });

  // Пример: Приватное сообщение конкретному клиенту
  socket.on('private_message', (data) => {
    const { targetSocketId, message } = data;
    io.to(targetSocketId).emit('private_message', `Личное: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Клиент отключён (ID: ${socket.id})`);
  });
});

async function connectToDB() {
  try {
    await mongoose.connect(config.SERVER.MONGODB_URI);
    console.log('✅ Подключение к MongoDB успешно');
  } catch (err) {
    console.error('❌ Ошибка подключения к MongoDB:', err.message);
    process.exit(1);
  }
}

server.listen(config.SERVER.PORT, async () => {
  console.log(`🚀 Сервер запущен на http://localhost:${config.SERVER.PORT}`);
  console.log(`🔌 Socket.IO доступен на ws://localhost:${config.SERVER.PORT}`);
  await connectToDB();
});

app.use('/api/users', userRoutes);
app.use('/api/stand', standRoutes);

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB отключен');
  process.exit();
});