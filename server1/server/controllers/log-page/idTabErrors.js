const { logError } = require('./logError');

function validateIdTabAndIndexStand(param) {
  const { idTab, IndexStand, res } = param || {};

  if (idTab === undefined || typeof IndexStand !== 'number') {
    logError('IdTab не найден или передаваемое значение не Number');
    if (res && typeof res.status === 'function') {
      res
        .status(400)
        .send({ error: 'IdTab не найден или передаваемое значение не Number' });
    }
    return false;
  }

  return true;
}

module.exports = {
  validateIdTabAndIndexStand,
};


