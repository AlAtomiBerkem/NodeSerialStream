function logError(message) {
    console.log(`\x1b[31m${message}\x1b[0m`);
}

function logSuccess(message) {
    console.log(`\x1b[32m${message}\x1b[0m`);
}

module.exports = { logError, logSuccess };


