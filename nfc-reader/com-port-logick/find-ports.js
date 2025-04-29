const { SerialPort } = require('serialport');

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

listPorts()