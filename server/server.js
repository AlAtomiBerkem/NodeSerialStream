const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose'); // Подключаем Mongoose
const config = require('./config/config');
const { initSocket, emitData, emitError } = require('./middleware/socketManager');
const { connectToPort, closePort } = require('./middleware/serial');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(routes);

const server = http.createServer(app);
initSocket(server);

// Функция для подключения к MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(config.SERVER.MONGODB_URI);
    console.log('✅ Подключение к MongoDB успешно');
  } catch (err) {
    console.error('❌ Ошибка подключения к MongoDB:', err.message);
    process.exit(1); // Завершаем процесс, если не удалось подключиться
  }
}

// Запуск сервера и подключение к БД
server.listen(config.SERVER.PORT, async () => {
  console.log(`✅Сервер запущен на http://localhost:${config.SERVER.PORT}`);
  await connectToDB(); // Подключаемся к MongoDB перед стартом
  await connectToPort(); // Подключаемся к Serial-порту
});

// Обработка завершения работы
process.on('SIGINT', async () => {
  await closePort();
  await mongoose.connection.close(); // Закрываем соединение с MongoDB
  console.log('MongoDB отключен');
  process.exit();
});