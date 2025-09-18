const axios = require('axios');
const USER_SERVICE_BASE = process.env.USER_SERVICE_BASE || 'http://192.168.1.128:3001';

async function checkUserExists(idTab) {
    try {
        const url = `${USER_SERVICE_BASE}/api/users/${encodeURIComponent(idTab)}`;
        const res = await axios.get(url, { timeout: 5000 });
        if (res && res.status >= 200 && res.status < 300) {
            console.log(`[USER] Пользователь ${idTab} зарегистрирован`);
            return true;
        }
    } catch (e) {
        if (e.response && e.response.status === 404) {
            console.warn('[USER] Планшет ещё не зарегистрирован');
            return false;
        }
        console.error('[USER] Ошибка проверки пользователя:', e.message);
    }
    return false;
}

async function fetchUser(idTab) {
    const url = `${USER_SERVICE_BASE}/api/users/${encodeURIComponent(idTab)}`;
    const res = await axios.get(url, { timeout: 5000 });
    return res.data;
}

function computeReadinessByRoom(user, roomIndex /* 1-based */) {
    if (!user) return { ready: false, reason: 'no_user' };
    const map = {
        1: 'checkingRoomOne',
        2: 'checkingRoomTwo',
        3: 'checkingRoomThree',
    };
    const key = map[roomIndex];
    const arr = key ? user[key] : null;
    if (!Array.isArray(arr) || arr.length === 0) return { ready: false, reason: 'no_room' };
    const ready = arr.every(Boolean);
    return { ready, reason: ready ? 'ok' : 'not_all_stands_passed', details: { key, total: arr.length, passed: arr.filter(Boolean).length } };
}

function computeReadinessOverall(user) {
    if (!user) return { ready: false, reason: 'no_user' };
    const keys = ['checkingRoomOne', 'checkingRoomTwo', 'checkingRoomThree'];
    const parts = keys.map((k) => Array.isArray(user[k]) ? user[k].every(Boolean) : false);
    const ready = parts.every(Boolean);
    return { ready, reason: ready ? 'ok' : 'not_all_rooms_passed' };
}

module.exports = { checkUserExists, fetchUser, computeReadinessByRoom, computeReadinessOverall };


