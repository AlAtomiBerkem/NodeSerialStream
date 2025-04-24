// controllers/userController.js
const User = require('../models/userModel');

const checkTestReadiness = async (req, res) => {
    try {
        const user = await User.findOne({ idTab: req.params.idTab });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверяем, все ли значения в checkingRoomOne true
        const allTestsPassed = user.checkingRoomOne.every(test => test === true);

        if (!allTestsPassed) {
            return res.status(400).json({ message: 'Вы прошли не все тесты' });
        }

        // Проверяем, что тест еще не начат (resultTest[0] === 0)
        if (user.resultTest[0] !== 0) {
            return res.status(400).json({ message: 'Тест уже пройден' });
        }

        // Если все условия выполнены
        res.json({
            message: 'OK',
            readyForTest: true,
            testOptions: [123, 456, 789], // варианты ответов для клиента
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

const submitTestAnswer = async (req, res) => {
    try {
        const { answer } = req.body; // ожидаем { answer: 123 } или другое значение
        const validAnswers = [123, 456, 789];

        if (!validAnswers.includes(answer)) {
            return res.status(400).json({ message: 'Неверный вариант ответа' });
        }

        const user = await User.findOne({ idTab: req.params.idTab });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверяем, что тест еще не завершен
        if (user.resultTest[0] !== 0) {
            return res.status(400).json({ message: 'Тест уже пройден' });
        }

        // Записываем ответ
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

module.exports = {
    checkTestReadiness,
    submitTestAnswer,
};