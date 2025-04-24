const User = require('../models/userModel');
const { logError, logSuccess } = require('./log-page/logError'); // Импортируем функции из logger.js
const { validateIdTabAndIndexStand } = require('./log-page/idTabErrors');
const axios = require ("axios");


exports.standState = async (req, res) => {
    const { idTab, room, IndexStand } = req.body;

    if (!validateIdTabAndIndexStand(idTab, IndexStand, res)) {
        return;
    }

    try {
        const user = await User.findOne({ idTab: idTab });

        if (!user) {
            logError(`Пользователь с таким IdTab не найден: ${idTab}`);
            return res.status(404).send({ error: 'Пользователь с таким IdTab не найден' });
        }

        const roomArray = user[room];

        if (IndexStand >= roomArray.length) {
            logError(`PATCH - [ERROR] Индекс ${IndexStand} выходит за пределы массива для пользователя ${idTab}`);
            return res.status(400).json({ error: 'Индекс выходит за пределы массива' });
        }

        const currentRoom = user[room][IndexStand];

        if (currentRoom) {
            logError(`PATCH - [ERROR] Пользователь ${idTab} уже прошел этот стенд`);
            return res.status(400).json({ error: 'вы уже прошли этот тест' });
        }

        const updateField = `${room}.${IndexStand}`;
        const updateObject = { [updateField]: true };

        const updatedUser = await User.findOneAndUpdate(
            { idTab: idTab },
            { $set: updateObject },
            { new: true }
        );

        logSuccess(`PATCH - [SUCCESS] Пользователь с idTab ${idTab} успешно прошел стенд ${room}[${IndexStand}]`);
        res.json(updatedUser);
    } catch (error) {
        logError(`PATCH - [ERROR] Произошла ошибка на стороне сервера для idTab - ${idTab}: ${error.message}`);
        res.status(500).json({ error: 'Произошла ошибка на стороне сервера' });
    }
};

exports.checkTests = async (req, res) => {
    try {
        const { idStand, idTab } = req.body;

         if (!idTab) {
            return res.status(400).json({ message: 'Не указан idTab' });
        }

         const user = await User.findOne({ idTab });

         if (!user) {
            return res.status(404).json({ message: 'Пользователь с таким idTab не найден' });
        }

        let allTestsPassed = false;

        if (idStand >= 1 && idStand <= 3) {
            allTestsPassed = user.checkingRoomOne.every(test => test);
        } else if (idStand >= 4 && idStand <= 6) {
            allTestsPassed = user.checkingRoomTwo.every(test => test);
        } else if (idStand >= 7 && idStand <= 9) {
            allTestsPassed = user.checkingRoomThree.every(test => test);
        }

        if (allTestsPassed) {
            await axios.post('http://localhost:4000/startTest', { startTest: true, idTab });
            return res.status(200).json({ message: 'Все тесты пройдены, startTest отправлен' });
        } else {
            return res.status(200).json({ message: 'Не все тесты пройдены' });
        }
    } catch (err) {
        console.error('Ошибка в checkTests:', err);
        return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};