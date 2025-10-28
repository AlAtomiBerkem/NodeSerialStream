import { describe, it, expect, vi } from 'vitest';
import { WSClient } from '../services/ws/index.js';

describe('WSClient', () => {
    it('registers and calls listeners', () => {
        const c = new WSClient('ws://example');
        const fn = vi.fn();
        const off = c.on('message', fn);
        c._emit('message', { ok: true });
        expect(fn).toHaveBeenCalledWith({ ok: true });
        off();
        c._emit('message', { ok: false });
        expect(fn).toHaveBeenCalledTimes(1);
    });
});


