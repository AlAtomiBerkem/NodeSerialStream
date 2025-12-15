const express = require('express');
const { createUser, getAllUsers, deleteUser, testResult, getOneUser, deleteAllUsers, getDailyArchivedUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/createUser', createUser);
router.get('/', getAllUsers);
router.get('/daily-archived', getDailyArchivedUsers);
router.delete('/all', deleteAllUsers);
router.delete('/:idTab', deleteUser);
router.get('/testResult/:idTab', testResult)
router.get('/:idTab', getOneUser);

module.exports = router;
