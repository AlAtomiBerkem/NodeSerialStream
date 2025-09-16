import { WS_URL } from '../../shared/config/env.js';

export class WSClient {
    constructor(url = WS_URL) {
        this.url = url;
        this.ws = null;
        this.listeners = new Map();
        this.connected = false;
    }

    connect() {
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', () => {
            this.connected = true;
            this._emit('open');
        });
        this.ws.addEventListener('close', () => {
            this.connected = false;
            this._emit('close');
        });
        this.ws.addEventListener('error', (e) => {
            this._emit('error', e);
        });
        this.ws.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                this._emit('message', data);
            } catch (_) {
                this._emit('message', event.data);
            }
        });
    }

    on(event, handler) {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event).add(handler);
        return () => this.off(event, handler);
    }

    off(event, handler) {
        const set = this.listeners.get(event);
        if (set) set.delete(handler);
    }

    send(payload) {
        if (this.connected) {
            const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
            this.ws.send(data);
        }
    }

    _emit(event, payload) {
        const set = this.listeners.get(event);
        if (set) for (const fn of set) fn(payload);
    }
}



