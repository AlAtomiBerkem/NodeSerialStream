const express = require('express');
const {standState} = require('../controllers/standController');
const router = express.Router();

router.patch('/update', standState);

module.exports = router;
