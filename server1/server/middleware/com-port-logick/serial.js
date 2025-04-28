const { SerialPort } = require('serialport');
const config = require('../../config/config');
const { emitData, emitError } = require('./socketManager');

let serialPort;
let latestData = 'Ожидание данных...';

async function connectToPort() {
    try {
        const ports = await SerialPort.list();
        console.log('Доступные порты:');
        ports.forEach(p => console.log(p.path, p.manufacturer || 'Unknown'));

        serialPort = new SerialPort({
            path: config.SERVER.PORT,
            baudRate: config.SERIAL.BAUD_RATE,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
        });

        serialPort.on('open', () => {
            console.log(`Подключено к ${config.SERIAL.PORT_NAME} (${config.SERIAL.BAUD_RATE} бод)`);
            latestData = `Порт ${config.SERIAL.PORT_NAME} открыт`;
            emitData(latestData);
        });

        serialPort.on('data', (data) => {
            latestData = data.toString();
            console.log('Получены данные:', latestData);
            emitData(latestData);
        });

        serialPort.on('error', (err) => {
            console.error('Ошибка порта:', err.message);
            latestData = `Ошибка: ${err.message}`;
            emitError(latestData);
        });

    } catch (err) {
        console.error('Ошибка подключения:', err);
        latestData = `Ошибка подключения: ${err.message}`;
        emitError(latestData);
    }
}

function getSerialData() {
    return {
        data: latestData,
        port: config.SERIAL.PORT_NAME,
        status: serialPort?.isOpen ? 'connected' : 'disconnected'
    };
}

function closePort() {
    if (serialPort?.isOpen) serialPort.close();
}

module.exports = {
    connectToPort,
    getSerialData,
    closePort
};