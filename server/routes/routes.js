const express = require('express');
const router = express.Router();
const { getSerialData } = require('../middleware/serial');

router.get('/api/data', (req, res) => {
    res.json(getSerialData());
});

module.exports = router;