const express = require('express');
const standRoutes = require('./routes/StandRoutes');
const config = require('./config/config');
const cors = require('cors');
const { ComReader } = require('./serial/comReader');
const { WSServer } = require('./services/wsServer');
const { fetchUser, computeReadinessByRoom, computeReadinessOverall, computeTestStatus } = require('./services/userService');
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
let lastOverall = undefined;
let lastComConnected = undefined;
let lastTagPlaced = undefined;
let _tagRemovalClearTimer = null;
let lastTestStatus = undefined;
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
    if (typeof lastOverall !== 'undefined') {
        try { ws.send(JSON.stringify({ type: 'device/overall', overall: lastOverall })); } catch {}
    }
    if (typeof lastComConnected !== 'undefined') {
        try { ws.send(JSON.stringify({ type: 'device/com', connected: lastComConnected })); } catch {}
    }
    if (typeof lastTagPlaced !== 'undefined') {
        try { ws.send(JSON.stringify({ type: 'device/tag', placed: lastTagPlaced })); } catch {}
    }
    if (typeof lastTestStatus !== 'undefined') {
        try { ws.send(JSON.stringify({ type: 'device/test', test: lastTestStatus })); } catch {}
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
                    .then((user) => {
                        const room = computeReadinessByRoom(user, STAND_ROOM);
                        const all = computeReadinessOverall(user);
                        const test = computeTestStatus(user, STAND_ROOM);
                        try { console.log('[READY]', { room: STAND_ROOM, roomReady: room, overall: all }); } catch {}
                        lastReadiness = room;
                        lastOverall = all;
                        lastTestStatus = test;
                        wsServer.broadcast({ type: 'device/readiness', readiness: room });
                        wsServer.broadcast({ type: 'device/overall', overall: all });
                        wsServer.broadcast({ type: 'device/test', test });
                    })
                    .catch(() => {});
            } else {
                lastReadiness = { ready: false, reason: 'unregistered' };
                wsServer.broadcast({ type: 'device/readiness', readiness: lastReadiness });
                lastOverall = { ready: false, reason: 'unregistered' };
                wsServer.broadcast({ type: 'device/overall', overall: lastOverall });
            }
        });
    },
    onTagStatusChange: (placed) => {
        lastTagPlaced = !!placed;
        wsServer.broadcast({ type: 'device/tag', placed: lastTagPlaced });
        if (lastTagPlaced) {
            if (_tagRemovalClearTimer) { clearTimeout(_tagRemovalClearTimer); _tagRemovalClearTimer = null; }
        } else {
            if (_tagRemovalClearTimer) { clearTimeout(_tagRemovalClearTimer); }
            _tagRemovalClearTimer = setTimeout(() => {
                if (lastTagPlaced === false) {
                    lastIdTab = null;
                    lastRegistered = false;
                    lastReadiness = { ready: false, reason: 'tag_removed_timeout' };
                    wsServer.broadcast({ type: 'device/idTab', idTab: null });
                    wsServer.broadcast({ type: 'device/registered', registered: false });
                    wsServer.broadcast({ type: 'device/readiness', readiness: lastReadiness });
                }
            }, 30000);
        }
    },
    onConnectionChange: (isConnected) => {
        lastComConnected = !!isConnected;
        wsServer.broadcast({ type: 'device/com', connected: lastComConnected });
        if (!lastComConnected) {
            lastTagPlaced = false;
            wsServer.broadcast({ type: 'device/tag', placed: false });
            lastIdTab = null;
            wsServer.broadcast({ type: 'device/idTab', idTab: null });
        }
    }
});
comReader.start();
