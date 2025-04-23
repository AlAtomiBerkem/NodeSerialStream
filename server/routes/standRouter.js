const express = require('express');
const {standState, checkTests} = require('../controllers/standController');
const router = express.Router();

router.patch('/update', standState);
router.post('/checkTests', checkTests);


module.exports = router;
