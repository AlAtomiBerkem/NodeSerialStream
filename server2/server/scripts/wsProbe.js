const WebSocket = require('ws');

const URL = process.env.WS_URL || 'ws://localhost:3000';
const ws = new WebSocket(URL);

ws.on('open', () => {
    console.log('[probe] connected to', URL);
});

ws.on('message', (data) => {
    try {
        const msg = JSON.parse(data.toString());
        console.log('[probe] message:', msg);
    } catch {
        console.log('[probe] message(raw):', data.toString());
    }
});

ws.on('close', () => {
    console.log('[probe] closed');
});

ws.on('error', (e) => {
    console.error('[probe] error:', e.message);
});

setTimeout(() => {
    console.log('[probe] done');
    try { ws.close(); } catch {}
    process.exit(0);
}, 15000);


