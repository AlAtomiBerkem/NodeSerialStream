const express = require('express');
const standRoutes = require('./routes/StandRoutes');
const config = require('./config/config');
const cors = require('cors');
const { ComReader } = require('./serial/comReader');
const { WSServer } = require('./services/wsServer');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));

 app.use(express.json());

 
 app.use('/api/stand', standRoutes);

 const PORT = config.SERVER.PORT;
const httpServer = app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
const wsServer = new WSServer(httpServer);

const { checkUserExists } = require('./services/userService');

const comReader = new ComReader({
    portPath: 'COM6',
    baudRate: 9600,
    logIntervalMs: 3000,
    disconnectTimeoutMs: 30000,
    onIdTabChange: (idTab) => {
        wsServer.broadcast({ type: 'device/idTab', idTab });
        checkUserExists(idTab).then((ok) => wsServer.broadcast({ type: 'device/registered', registered: !!ok }));
    }
});
comReader.start();
