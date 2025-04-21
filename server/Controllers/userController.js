const User = require('../models/userModel');
const { logError, logSuccess } = require('./Loger/loger'); // Импортируем функции из logger.js

exports.createUser = async (req, res) => {
    try {
        const { UserName, idTab } = req.body;
        const newUser = new User({ UserName, idTab });
        await newUser.save();
        res.status(201).json(newUser);
        logSuccess(`POST - [SUCCESS пользователь ${UserName} создан ${res.statusCode}]`);
    } catch (err) {
        res.status(400).json({ message: err.message });
        logError(`POST - [ERROR ошибка при создании нового пользователя ${res.statusCode}]`);
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
