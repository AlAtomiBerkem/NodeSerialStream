const express = require('express');
const { createUser, getAllUsers, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/createUser', createUser);
router.get('/', getAllUsers);
router.delete('/:idTab', deleteUser);

module.exports = router;
