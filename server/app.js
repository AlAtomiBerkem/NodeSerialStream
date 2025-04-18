const { SerialPort } = require('serialport');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const PORT_NAME = 'COM7';
const BAUD_RATE = 9600;
const SERVER_PORT = 5000;

let serialPort;
let latestData = 'Ожидание данных...';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

async function connectToPort() {
    try {
        const ports = await SerialPort.list();
        console.log('Доступные порты:');
        ports.forEach(p => console.log(p.path, p.manufacturer || 'Unknown'));

        serialPort = new SerialPort({
            path: PORT_NAME,
            baudRate: BAUD_RATE,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
        });

        serialPort.on('open', () => {
            console.log(`Подключено к ${PORT_NAME} (${BAUD_RATE} бод)`);
            latestData = `Порт ${PORT_NAME} открыт`;
            io.emit('serial-data', latestData);
        });

        serialPort.on('data', (data) => {
            latestData = data.toString();
            console.log('Получены данные:', latestData);
            io.emit('serial-data', latestData);
        });

        serialPort.on('error', (err) => {
            console.error('Ошибка порта:', err.message);
            latestData = `Ошибка: ${err.message}`;
            io.emit('serial-error', latestData);
        });

    } catch (err) {
        console.error('Ошибка подключения:', err);
        latestData = `Ошибка подключения: ${err.message}`;
        io.emit('serial-error', latestData);
    }
}

app.get('/api/data', (req, res) => {
    res.json({
        data: latestData,
        port: PORT_NAME,
        status: serialPort?.isOpen ? 'connected' : 'disconnected',
    });
});

server.listen(SERVER_PORT, async () => {
    console.log(`Сервер запущен на http://localhost:${SERVER_PORT}`);
    await connectToPort();
});

process.on('SIGINT', () => {
    if (serialPort?.isOpen) serialPort.close();
    process.exit();
});