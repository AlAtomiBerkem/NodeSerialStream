const { logError, logSuccess } = require('./logError');

describe('logError/logSuccess', () => {
    const originalLog = console.log;
    let logged: string[];

    beforeEach(() => {
        logged = [];
        console.log = (msg?: unknown) => {
            if (typeof msg === 'string') logged.push(msg);
        };
    });

    afterEach(() => {
        console.log = originalLog;
    });

    test('logError prints red wrapped message', () => {
        logError('ERR');
        expect(logged.some(s => s.includes('ERR'))).toBe(true);
    });

    test('logSuccess prints green wrapped message', () => {
        logSuccess('OK');
        expect(logged.some(s => s.includes('OK'))).toBe(true);
    });
});


