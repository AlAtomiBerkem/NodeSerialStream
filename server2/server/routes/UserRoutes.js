 const express = require('express');
const router = express.Router();
const {
    checkTestReadiness,
    submitTestAnswer,
} = require('../controlers/userController');

 router.get('/:idTab', checkTestReadiness);

 router.post('/:idTab/answer', submitTestAnswer);

module.exports = router;