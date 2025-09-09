const express = require('express');
const router = express.Router();

router.patch('/update', async (req, res) => {
    try {
        return res.json({ message: 'Stand update endpoint is reachable', payload: req.body });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

module.exports = router;


