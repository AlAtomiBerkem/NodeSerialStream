const express = require('express');
const { createUser, getAllUsers, deleteUser, testResult, getOneUser } = require('../controllers/userController');
const router = express.Router();

router.post('/createUser', createUser);
router.get('/', getAllUsers);
router.delete('/:idTab', deleteUser);
router.get('/testResult/:idTab', testResult)
router.get('/:idTab', getOneUser);

module.exports = router;
