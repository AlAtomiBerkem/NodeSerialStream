const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { SerialPort } = require('serialport');
const config = require('./config/config');
const app = express();
const server = http.createServer(app);
const userRoutes = require('./routes/userRouter');
const standRoutes = require('./routes/standRouter');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: [
       'http://localhost:3000',
       'http://localhost:3100',
       'http://localhost:4000',
       'http://10.0.0.128:3000',
       'http://localhost:3003',
       'http://10.0.0.128:3003'
      ],
  }));

app.use('/api/users', userRoutes);
app.use('/api/stand', standRoutes);

app.get('/api/serial/ports', async (req, res) => {
    try {
        const ports = await SerialPort.list();
        res.json(ports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
    console.log(`✅ Сервер запущен на http://localhost:${config.SERVER.PORT}`);
    await connectToDB();
});


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB отключен');
  process.exit();
});
