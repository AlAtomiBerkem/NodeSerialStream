const { SerialPort } = require('serialport');

const PORT_NAME = 'COM7';
const BAUD_RATE = 9600;

let serialPort;
let latestData = 'Ожидание данных...';
let isReconnecting = false; // Флаг для избежания множественных переподключений

// Функция для безопасного закрытия порта
async function closePort() {
  return new Promise((resolve) => {
    if (!serialPort || !serialPort.isOpen) {
      return resolve();
    }

    serialPort.close((err) => {
      if (err) {
        console.error('Ошибка при закрытии порта:', err.message);
      } else {
        console.log(`Порт ${PORT_NAME} закрыт`);
      }
      resolve();
    });
  });
}

// Функция подключения с обработкой ошибок
async function connectToPort(io) {
  if (isReconnecting) return;
  isReconnecting = true;

  try {
    await closePort(); // Закрываем порт перед новым подключением

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
      isReconnecting = false;
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
      isReconnecting = false;
    });

  } catch (err) {
    console.error('Ошибка подключения:', err);
    latestData = `Ошибка подключения: ${err.message}`;
    io.emit('serial-error', latestData);
    isReconnecting = false;
  }
}

module.exports = {
  connectToPort,
  closePort,
  getLatestData: () => latestData,
  getPortStatus: () => serialPort?.isOpen ? 'connected' : 'disconnected',
};
