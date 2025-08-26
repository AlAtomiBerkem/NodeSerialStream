const User = require('../models/userModel');
const { logError, logSuccess } = require('./log-page/logError');

exports.createUser = async (req, res) => {
    try {
        const { UserName, UserLastName, UserEmail, idTab } = req.body;
        const existingUser = await User.findOne({ $or: [{ idTab: idTab }] });

        if (!UserName || !UserLastName || !UserEmail || !idTab) {
            return res.status(400).json({ message: 'Поля UserName, UserLastName, UserEmail и idTab обязательны' });
        }

        if (existingUser) {
            logError(`POST - [ERROR попытка создания дубликата пользователя | ${idTab} | ${400}]`);
            return res.status(400).json({ message: "idTab уже существует в сети" });
        }

        const newUser = new User({ UserName, UserLastName, UserEmail, idTab });
        await newUser.save();

        res.status(201).json(newUser);
        logSuccess(`POST - [SUCCESS пользователь ${UserName} ${UserLastName} ${UserEmail} создан ${res.statusCode}]`);
    } catch (err) {
        logError(`POST - [ERROR ошибка при создании нового пользователя | ${err.message} | ${400}]`);
        res.status(400).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        logSuccess(`GET - [SUCCESS успешный запрос: таблица пользователей ${res.statusCode}]`);

    } catch (err) {
        res.status(500).json({ message: err.message });
        logError(`GET - [ERROR ошибка при получении пользователей ${res.statusCode}]`);
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const idTab = req.params.idTab;  
        const user = await User.findOne({ idTab: idTab }); 

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json(user); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};

exports.deleteUser = async (req, res) => {
    const { idTab } = req.params;

    try {
        const user = await User.findOneAndDelete({ idTab: idTab });

        if (!user) {
            logError(`Пользователь с таким IdTab не найден: ${idTab}`);
            return res.status(404).send({ error: 'Пользователь с таким IdTab не найден' });
        }

        logSuccess(`DELETE - [SUCCESS] Пользователь с idTab ${idTab} успешно удален`);
        res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        logError(`DELETE - [ERROR] Произошла ошибка на стороне сервера для idTab - ${idTab}: ${error.message}`);
        res.status(500).json({ error: 'Произошла ошибка на стороне сервера' });
    }
};

exports.testResult = async (req, res) => {
    const { idTab } = req.params;

    if (!idTab) {
        return res.status(400).json({ error: `Параметр idTab не указан` });
    }

    try {
         const result = await User.findOne({ idTab });

        if (!result) {
            return res.status(404).json({ error: `Данные для idTab "${idTab}" не найдены` });
        }

         res.status(200).json({
            idTab: result.idTab,
            resultTest: result.resultTest
        });

    } catch (e) {
        console.error(`GET /api/test/${idTab} - [ERROR]:`, e.message);
        res.status(500).json({ error: "Ошибка сервера при получении данных" });
    }
};


exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        logSuccess(`DELETE - [SUCCESS] Все пользователи успешно удалены`);
        return res.status(200).json({ message: "Все пользователи успешно удалены" });
    } catch (e) {
        console.error(`DELETE /api/users/all - [ERROR]:`, e.message);
        return res.status(500).json({ error: "Ошибка сервера при удалении всех пользователей" });
    }
}