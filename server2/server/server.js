const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SerialPort = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Подключение к COM-порту
const port = new SerialPort({ path: 'COM5', baudRate: 9600 }); // Убедитесь, что 'COM7' - это строка

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => {
  console.log('Serial port opened');
  io.emit('nfc-status', 'NFC reader ready');
});

parser.on('data', (data) => {
  console.log('NFC data:', data);
  io.emit('nfc-data', data);
});

port.on('error', (err) => {
  console.error('Serial error:', err);
  io.emit('nfc-error', err.message);
});

// Ваши существующие маршруты
app.use('/api/users', require('./routes/UserRoutes'));

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
