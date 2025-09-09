const axios = require('axios');

const USER_SERVICE_BASE = process.env.USER_SERVICE_BASE || 'http://10.0.0.128:3001';

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

module.exports = { checkUserExists };


