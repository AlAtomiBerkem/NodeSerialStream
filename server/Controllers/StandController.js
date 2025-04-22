const User = require('../models/userModel');
const { logError, logSuccess } = require('./Loger/loger'); // Импортируем функции из logger.js

exports.standState = async (req, res) => {
    const { idTab, room, IndexStand } = req.body;

    if (idTab === undefined || typeof IndexStand !== 'number') {
        logError('IdTab не найден или передоваемое значение не Number');
        return res.status(400).send({ error: 'IdTab не найден или передоваемое значение не Number' });
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
