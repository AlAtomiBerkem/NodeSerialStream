const User = require('../models/userModel');
const { logError, logSuccess } = require('./Loger/loger'); // Импортируем функции из logger.js
const { validateIdTabAndIndexStand } = require('./Loger/idTabErrors');
import axios from "axios";


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
            return res.status(400).json({ error: 'ВЫ УЖЕ ПРОШЛИ ЭТОТ СТЕНД' });
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
        const user = await User.findOne({ idTab });

        if (!idTab) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        let allTestsPassed = false;

        // Проверяем тесты для соответствующей комнаты
        if (idStand >= 1 && idStand <= 3) {
            allTestsPassed = user.checkingRoomOne.every(test => test);
        } else if (idStand >= 4 && idStand <= 6) {
            allTestsPassed = user.checkingRoomTwo.every(test => test);
        } else if (idStand >= 7 && idStand <= 9) {
            allTestsPassed = user.checkingRoomThree.every(test => test);
        }

        if (allTestsPassed) {
            await axios.post('http://localhost:3001/startTest', { startTest: true, idTab });
            res.status(200).json({ message: 'Все тесты пройдены, startTest отправлен' });
        } else {
            res.status(200).json({ message: 'Не все тесты пройдены' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        logError(`POST - [ERROR ошибка при проверке тестов ${res.statusCode}]`);
    }
};