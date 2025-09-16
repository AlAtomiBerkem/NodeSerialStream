export class WSClientMock {
    constructor() {
        this.listeners = new Map();
        this.connected = false;
        this._timer = null;
    }
    connect() {
        this.connected = true;
        this._emit('open');
        let step = 0;
        this._timer = setInterval(() => {
            step++;
            if (step === 1) this._emit('message', { type: 'device/idTab', idTab: 'MOCK_TAB_123' });
            if (step === 2) this._emit('message', { type: 'device/registered', registered: true });
            if (step > 4) {
                clearInterval(this._timer);
                this._emit('close');
                this.connected = false;
            }
        }, 1000);
    }
    on(ev, fn) {
        if (!this.listeners.has(ev)) this.listeners.set(ev, new Set());
        this.listeners.get(ev).add(fn);
        return () => this.off(ev, fn);
    }
    off(ev, fn) {
        const s = this.listeners.get(ev);
        if (s) s.delete(fn);
    }
    _emit(ev, p) {
        const s = this.listeners.get(ev);
        if (s) for (const fn of s) fn(p);
    }
}


