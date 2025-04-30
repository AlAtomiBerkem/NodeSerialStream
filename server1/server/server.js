const express = require('express');
const http = require('http');
const mongoose = require('mongoose'); // Подключаем Mongoose
const config = require('./config/config');
const app = express();
const server = http.createServer(app);
const userRoutes = require('./routes/userRouter');
const standRoutes = require('./routes/standRouter');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3100'],
}));

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

app.use('/api/users', userRoutes);
app.use('/api/stand', standRoutes);


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB отключен');
  process.exit();
});


