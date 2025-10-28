const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { SerialPort } = require('serialport');
const config = require('./config/config');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const userRoutes = require('./routes/userRouter');
const standRoutes = require('./routes/standRouter');
const cors = require('cors');


app.use(express.json());
app.use(cors({
  origin: '*',
  // origin: ['http://localhost:3000', 'http://localhost:3100'], // Закомментировано
}));

const { initSocket, emitData, emitError } = require('./middleware/com-port-logick/socketManager');
initSocket(server);


const { connectToPort, getSerialData, closePort } = require('./middleware/com-port-logick/serial');
connectToPort();

async function listPorts() {
    const ports = await SerialPort.list();
    console.log('Доступные порты:');
    if (ports.length === 0) {
        console.log('Порты не найдены!');
    } else {
        ports.forEach(port => {
            console.log(`- ${port.path} (Производитель: ${port.manufacturer || 'не указан'}, ID: ${port.productId || 'не указан'})`);
        });
    }
}

app.use('/api/users', userRoutes);
app.use('/api/stand', standRoutes);
app.get('/api/serial', (req, res) => {
    res.json(getSerialData());
});

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

server.listen(config.SERVER.PORT, config.SERVER.HOST, async () => {
    console.log(`✅ Сервер запущен на http://${config.SERVER.HOST}:${config.SERVER.PORT}`);
    console.log(`🌐 Доступен по WiFi: http://[IP_КОМПЬЮТЕРА]:${config.SERVER.PORT}`);
    await connectToDB();
    await listPorts();
});

process.on('SIGINT', async () => {
    closePort();
    await mongoose.connection.close();
    console.log('MongoDB отключен');
    process.exit();
  });
;

