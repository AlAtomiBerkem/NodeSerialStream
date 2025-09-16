const express = require('express');
const standRoutes = require('./routes/StandRoutes');
const config = require('./config/config');
const cors = require('cors');
const { ComReader } = require('./serial/comReader');
const { WSServer } = require('./services/wsServer');
const { fetchUser, computeReadinessByRoom } = require('./services/userService');
const STAND_ROOM = require('./config/config').STAND.ROOM;

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

let lastIdTab = null;
let lastRegistered = undefined;
let lastReadiness = undefined;
wsServer.wss.on('connection', (ws) => {
    if (lastIdTab) {
        try { ws.send(JSON.stringify({ type: 'device/idTab', idTab: lastIdTab })); } catch {}
    }
    if (typeof lastRegistered !== 'undefined') {
        try { ws.send(JSON.stringify({ type: 'device/registered', registered: !!lastRegistered })); } catch {}
    }
    if (typeof lastReadiness !== 'undefined') {
        try { ws.send(JSON.stringify({ type: 'device/readiness', readiness: lastReadiness })); } catch {}
    }
});

const { checkUserExists } = require('./services/userService');

const comReader = new ComReader({
    portPath: 'COM6',
    baudRate: 9600,
    logIntervalMs: 3000,
    disconnectTimeoutMs: 30000,
    onIdTabChange: (idTab) => {
        lastIdTab = idTab;
        wsServer.broadcast({ type: 'device/idTab', idTab });
        checkUserExists(idTab).then((ok) => {
            lastRegistered = !!ok;
            wsServer.broadcast({ type: 'device/registered', registered: lastRegistered });
            if (lastRegistered) {
                fetchUser(idTab)
                    .then((user) => computeReadinessByRoom(user, STAND_ROOM))
                    .then((r) => { lastReadiness = r; wsServer.broadcast({ type: 'device/readiness', readiness: r }); })
                    .catch(() => {});
            } else {
                lastReadiness = { ready: false, reason: 'unregistered' };
                wsServer.broadcast({ type: 'device/readiness', readiness: lastReadiness });
            }
        });
    }
});
comReader.start();
