const { SerialPort } = require('serialport');
const express = require('express');
const cors = require('cors');
const http = require('http'); // Новый модуль
const { Server } = require('socket.io'); // Новый импорт

const app = express();
app.use(cors());


const PORT_NAME = '/dev/tty.usbserial-130';
const BAUD_RATE = 9600;
const SERVER_PORT = 5000;

let serialPort;
let latestData = 'Ожидание данных...';

const server = http.createServer(app); // Новый сервер

const io = new Server(server, {
    cors: {
        origin: '*', // Разрешаем подключение с любых доменов
    },
});

async function connectToPort() {
    try {
        const ports = await SerialPort.list();
        console.log('Доступные порты:');
        ports.forEach(p => console.log(p.path, p.manufacturer || 'Unknown'));

        serialPort = new SerialPort({
            path: PORT_NAME,
            baudRate: BAUD_RATE,
        });

        serialPort.on('open', () => {
            console.log(`Подключено к ${PORT_NAME} (${BAUD_RATE} бод)`);
        });

        serialPort.on('data', (data) => {
            latestData = data.toString();
            console.log('Получены данные:', latestData);

            io.emit('serial-data', latestData); // Ключевая строка!
        });

        serialPort.on('error', (err) => {
            console.error('Ошибка порта:', err.message);
            latestData = `Ошибка: ${err.message}`;
            io.emit('serial-error', latestData);
        });

    } catch (err) {
        console.error('Ошибка подключения:', err);
        latestData = `Ошибка подключения: ${err.message}`;
    }
}

app.get('/api/data', (req, res) => {
    res.json({
        data: latestData,
        port: PORT_NAME,
        status: serialPort?.isOpen ? 'connected' : 'disconnected',
    });
});

// Запускаем сервер с поддержкой WebSocket
server.listen(SERVER_PORT, async () => {
    console.log(`Сервер запущен на http://localhost:${SERVER_PORT}`);
    await connectToPort();
});

process.on('SIGINT', () => {
    if (serialPort?.isOpen) {
        serialPort.close();
    }
    process.exit();
});