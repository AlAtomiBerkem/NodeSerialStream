// logger.js

// Функция для логирования ошибок с красным цветом
function logError(message) {
    console.log(`\x1b[31m${message}\x1b[0m`); // \x1b[31m - красный цвет, \x1b[0m - сброс цвета
}

// Функция для логирования успешных сообщений с зеленым цветом
function logSuccess(message) {
    console.log(`\x1b[32m${message}\x1b[0m`); // \x1b[32m - зеленый цвет, \x1b[0m - сброс цвета
}

module.exports = {
    logError,
    logSuccess
};
