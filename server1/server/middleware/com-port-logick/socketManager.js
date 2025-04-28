let io;

function initSocket(server) {
    const { Server } = require('socket.io');
    io = new Server(server, { cors: { origin: '*' } });
}

function emitData(data) {
    if (io) io.emit('serial-data', data);
}

function emitError(error) {
    if (io) io.emit('serial-error', error);
}

module.exports = {
    initSocket,
    emitData,
    emitError
};