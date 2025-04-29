let io;

function initSocket(server) {
    const { Server } = require('socket.io');
    io = new Server(server, { 
        cors: { 
            origin: 'http://localhost:3100' // Указываем конкретный origin
        } 
    });
}

function emitData(portName, data) {
    if (io) io.emit(`serial-data-${portName}`, data);
}

function emitError(portName, error) {
    if (io) io.emit(`serial-error-${portName}`, error);
}

module.exports = {
    initSocket,
    emitData,
    emitError
};