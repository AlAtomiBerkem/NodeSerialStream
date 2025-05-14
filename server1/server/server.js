// server1/server.js (дополненный)
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/config');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const userRoutes = require('./routes/userRouter');
const standRoutes = require('./routes/standRouter');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3100'],
}));

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3100'],
    methods: ['GET', 'POST'],
  },
});

// Новый обработчик для передачи данных о пользователях
io.on('connection', (socket) => {
  console.log(`🔌 Новый клиент подключён (ID: ${socket.id})`);

  // Отправка данных о пользователях при подключении
  socket.on('request_users', async () => {
    try {
      const User = mongoose.model('User');
      const users = await User.find({});
      socket.emit('users_data', users);
    } catch (err) {
      console.error('Ошибка при получении пользователей:', err);
      socket.emit('users_error', 'Не удалось получить данные');
    }
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