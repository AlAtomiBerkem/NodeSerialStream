 const express = require('express');
const router = express.Router();
const {
    checkTestReadiness,
    submitTestAnswer,
    createUser,
    deleteUser,
    getUserByIdTab,
    getAllUsers,
} = require('../controlers/userController');

router.get('/:idTab/readiness', checkTestReadiness);

router.post('/:idTab/answer', submitTestAnswer);

router.post('/createUser', createUser);
router.delete('/:idTab', deleteUser);
router.get('/:idTab', getUserByIdTab);
router.get('/', getAllUsers);

module.exports = router;