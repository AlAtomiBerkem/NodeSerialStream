const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

class ComReader {
    constructor(options) {
        this.portPath = options.portPath || 'COM6';
        this.baudRate = options.baudRate || 9600;
        this.currentIdTab = null;
        this.onIdTabChange = options.onIdTabChange;
        this.connected = false;
        this.logIntervalMs = options.logIntervalMs || 3000;
        this.disconnectTimeoutMs = options.disconnectTimeoutMs || 20000;
        this._logTimer = null;
        this._disconnectTimer = null;
        this._port = null;
        this._parser = null;
    }

    start() {
        this._port = new SerialPort({ path: this.portPath, baudRate: this.baudRate, autoOpen: false });
        this._parser = this._port.pipe(new ReadlineParser({ delimiter: '\n' }));

        this._port.on('open', () => {
            this.connected = true;
            this._startLogging();
            this._armDisconnectTimer();
            console.log(`[COM] Порт ${this.portPath} открыт, скорость ${this.baudRate}`);
        });

        this._port.on('error', (err) => {
            console.error('[COM] Ошибка порта:', err.message);
            // Не очищаем сразу idTab — ждём 20 секунд восстановления
            this.connected = false;
            this._armDisconnectTimer();
        });

        this._port.on('close', () => {
            console.warn('[COM] Порт закрыт');
            // Не очищаем сразу idTab — ждём 20 секунд восстановления
            this.connected = false;
            this._armDisconnectTimer();
        });

        this._parser.on('data', (line) => {
            const raw = String(line).trim();
            if (!raw) return;
            const previous = this.currentIdTab;
            this.currentIdTab = raw;
            this.connected = true;
            this._armDisconnectTimer();
            if (previous !== this.currentIdTab && typeof this.onIdTabChange === 'function') {
                try { this.onIdTabChange(this.currentIdTab); } catch (_) {}
            }
            console.log(`[COM] Считан idTab: ${this.currentIdTab}`);
        });

        this._port.open((err) => {
            if (err) {
                console.error('[COM] Не удалось открыть порт:', err.message);
                this._handleDisconnect();
            }
        });
    }

    _startLogging() {
        if (this._logTimer) clearInterval(this._logTimer);
        this._logTimer = setInterval(() => {
            if (this.connected && this.currentIdTab) {
                console.log(`[COM] Подключено: idTab=${this.currentIdTab}`);
            } else if (this.connected && !this.currentIdTab) {
                console.log('[COM] Подключено: idTab пока не получен');
            } else {
                console.log('[COM] Нет подключения');
            }
        }, this.logIntervalMs);
    }

    _armDisconnectTimer() {
        if (this._disconnectTimer) clearTimeout(this._disconnectTimer);
        this._disconnectTimer = setTimeout(() => {
            this._handleDisconnect(true);
        }, this.disconnectTimeoutMs);
    }

    _handleDisconnect(fromTimeout = false) {
        if (fromTimeout) {
            if (this.currentIdTab) {
                console.warn(`[COM] Таймаут соединения. Очищаю idTab (${this.currentIdTab})`);
            } else {
                console.warn('[COM] Таймаут соединения. idTab не установлен');
            }
        } else {
            console.warn('[COM] Соединение потеряно');
        }
        this.connected = false;
        this.currentIdTab = null;
    }

    stop() {
        if (this._logTimer) clearInterval(this._logTimer);
        if (this._disconnectTimer) clearTimeout(this._disconnectTimer);
        if (this._port && this._port.isOpen) {
            this._port.close();
        }
    }
}

module.exports = { ComReader };


