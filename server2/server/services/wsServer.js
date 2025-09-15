const { WebSocketServer } = require('ws');

class WSServer {
    constructor(server) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Set();
        this._bind();
    }

    _bind() {
        this.wss.on('connection', (ws) => {
            this.clients.add(ws);
            ws.on('close', () => this.clients.delete(ws));
            ws.on('error', () => this.clients.delete(ws));
        });
    }

    broadcast(payload) {
        const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
        for (const ws of this.clients) {
            if (ws.readyState === 1) {
                ws.send(data);
            }
        }
    }
}

module.exports = { WSServer };


