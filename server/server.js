const express = require('express');
const http = require('http');
const mongoose = require('mongoose'); // Подключаем Mongoose
const config = require('./config/config');
const app = express();
const server = http.createServer(app);
const userRoutes = require('./routes/userRouter');

app.use(express.json());

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
  console.log(`✅ Сервер запущен на http://localhost:${config.SERVER.PORT}`);
  await connectToDB();
});

//тут добавим маршруты
app.use('/api/users', userRoutes);


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB отключен');
  process.exit();
});
