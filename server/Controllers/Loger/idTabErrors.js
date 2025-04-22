const { logError } = require('./loger'); // Импортируем функцию логирования ошибок

/**
 * Функция для проверки idTab и IndexStand.
 * @param {number} idTab - Идентификатор пользователя.
 * @param {number} IndexStand - Индекс стенда.
 * @param {object} res - Объект ответа Express.
 * @returns {boolean} - Возвращает true, если проверка прошла успешно, иначе false.
 */
function validateIdTabAndIndexStand(idTab, IndexStand, res) {
    if (idTab === undefined || typeof IndexStand !== 'number') {
        logError('IdTab не найден или передоваемое значение не Number');
        res.status(400).send({ error: 'IdTab не найден или передоваемое значение не Number' });
        return false;
    }
    return true;
}

module.exports = {
    validateIdTabAndIndexStand
};
