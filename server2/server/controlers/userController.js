const User = require('../models/userModel');

const checkTestReadiness = async (req, res) => {
    try {
        const user = await User.findOne({ idTab: req.params.idTab });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

         const allTestsPassed = user.checkingRoomOne.every(test => test === true);

        if (!allTestsPassed) {
            return res.status(400).json({ message: 'Вы прошли не все тесты' });
        }

        if (user.resultTest[0] !== 0) {
            return res.status(400).json({ message: 'Тест уже пройден' });
        }

         res.json({
            message: 'OK',
            readyForTest: true,
            testOptions: [123, 456, 789],
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

const submitTestAnswer = async (req, res) => {
    try {
        const { answer } = req.body;
        const validAnswers = [123, 456, 789];

        if (!validAnswers.includes(answer)) {
            return res.status(400).json({ message: 'Неверный вариант ответа' });
        }

        const user = await User.findOne({ idTab: req.params.idTab });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

         if (user.resultTest[0] !== 0) {
            return res.status(400).json({ message: 'Тест уже пройден' });
        }

         user.resultTest[0] = answer;
        await user.save();

        res.json({
            message: 'Ответ принят',
            result: answer,
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

const normalizeIdTab = (value) => String(value);

const createUser = async (req, res) => {
    try {
        const { UserName, UserLastName, UserEmail, idTab } = req.body || {};
        if (!UserName || !idTab) {
            return res.status(400).json({ message: 'UserName и idTab обязательны' });
        }
        const idTabStr = normalizeIdTab(idTab);
        const exists = await User.findOne({ idTab: idTabStr });
        if (exists) {
            return res.status(409).json({ message: 'Пользователь уже существует' });
        }
        const user = new User({ UserName, UserLastName, UserEmail, idTab: idTabStr });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const idTabStr = normalizeIdTab(req.params.idTab);
        const result = await User.findOneAndDelete({ idTab: idTabStr });
        if (!result) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        return res.json({ message: 'Пользователь удалён' });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

const getUserByIdTab = async (req, res) => {
    try {
        const idTabStr = normalizeIdTab(req.params.idTab);
        const user = await User.findOne({ idTab: idTabStr });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

module.exports = {
    checkTestReadiness,
    submitTestAnswer,
    createUser,
    deleteUser,
    getUserByIdTab,
    getAllUsers,
};