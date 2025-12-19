const User = require('../models/userModel');
const DeletedUser = require('../models/deletedUserModel');
const { logError, logSuccess } = require('./log-page/logError');
const axios = require('axios');

exports.createUser = async (req, res) => {
    try {
        const { UserName, UserLastName, UserEmail, idTab } = req.body;
        const existingUser = await User.findOne({ idTab });

        if (!UserName || !UserLastName || !UserEmail || !idTab) {
            res.status(400).json({ message: 'Поля UserName, UserLastName, UserEmail и idTab обязательны' });
            return;
        }

        if (existingUser) {
            logError(`POST - [ERROR попытка создания дубликата пользователя | ${idTab} | 400]`);
            res.status(400).json({ message: "idTab уже существует в сети" });
            return;
        }

        const newUser = new User({ UserName, UserLastName, UserEmail, idTab });
        await newUser.save();

        // Отправляем событие регистрации в RssStart (асинхронно, не блокируем ответ)
        const RSS_START_URL = process.env.RSS_START_URL || 'http://rssstart:3201/events/user-created';
        axios.post(RSS_START_URL, {
            UserName,
            UserLastName,
            UserEmail,
            idTab
        }).catch(err => {
            console.error(`[server1] Ошибка отправки события регистрации в RssStart: ${err.message}`);
        });

        res.status(201).json(newUser);
        logSuccess(`POST - [SUCCESS пользователь ${UserName} ${UserLastName} ${UserEmail} создан ${res.statusCode}]`);
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`POST - [ERROR ошибка при создании нового пользователя | ${error.message} | 400]`);
        res.status(400).json({ message: error.message });
        return;
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        logSuccess(`GET - [SUCCESS успешный запрос: таблица пользователей ${res.statusCode}]`);
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`GET - [ERROR ошибка при получении пользователей | ${error.message}]`);
        res.status(500).json({ message: error.message });
    }
};

exports.getOneUser = async (req, res) => {
    const idTab = req.params.idTab;
    if (!idTab) {
        res.status(400).json({ message: "idTab обязателен" });
        return;
    }

    try {
        const user = await User.findOne({ idTab: idTab });
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const idTab = req.params.idTab;
    if (!idTab) {
        res.status(400).json({ message: "idTab обязателен" });
        return;
    }

    try {
        const user = await User.findOne({ idTab: idTab });
        if (!user) {
            logError(`Пользователь с таким IdTab не найден: ${idTab}`);
            res.status(404).send({ error: 'Пользователь с таким IdTab не найден' });
            return;
        }

        // Сохраняем данные пользователя в архив перед удалением
        const deletedUser = new DeletedUser({
            UserName: user.UserName,
            UserLastName: user.UserLastName,
            UserEmail: user.UserEmail,
            idTab: user.idTab,
            deletedAt: new Date()
        });
        await deletedUser.save();

        // Отправляем событие в сервис RssExit (зона сдачи паспорта)
        const rssExitUrl =
            process.env.RSS_EXIT_URL || 'http://localhost:3200/events/user-deleted';
        try {
            await axios.post(
                rssExitUrl,
                {
                    UserName: user.UserName,
                    UserLastName: user.UserLastName,
                    UserEmail: user.UserEmail,
                    idTab: user.idTab,
                },
                { timeout: 2000 }
            );
            logSuccess(
                `RSS EXIT - [INFO] Событие удаления пользователя ${user.idTab} отправлено в RssExit`
            );
        } catch (postErr) {
            const msg =
                postErr instanceof Error ? postErr.message : 'Unknown error while calling RssExit';
            logError(
                `RSS EXIT - [WARN] Не удалось отправить событие удаления пользователя ${user.idTab}: ${msg}`
            );
            // Ошибку не пробрасываем, чтобы удаление пользователя не ломалось из-за RssExit
        }

        // Удаляем пользователя из основной таблицы
        await User.findOneAndDelete({ idTab: idTab });

        logSuccess(`DELETE - [SUCCESS] Пользователь с idTab ${idTab} успешно удален и сохранен в архив`);
        res.json({ message: 'Пользователь успешно удален' });
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`DELETE - [ERROR] Произошла ошибка на стороне сервера для idTab - ${idTab}: ${error.message}`);
        res.status(500).json({ message: 'Произошла ошибка на стороне сервера' });
    }
};

exports.testResult = async (req, res) => {
    const idTab = req.params.idTab;
    if (!idTab) {
        res.status(400).json({ message: "idTab обязателен" });
        return;
    }

    try {
        const result = await User.findOne({ idTab: idTab });
        if (!result) {
            res.status(404).json({ error: `Данные для idTab "${idTab}" не найдены` });
            return;
        }

        res.status(200).json({
            idTab: result.idTab,
            resultTest: result.resultTest
        });
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error(`GET /api/test/${idTab} - [ERROR]:`, error.message);
        res.status(500).json({ message: "Ошибка сервера при получении данных" });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        // Сначала переносим всех текущих пользователей в архив,
        // чтобы массовое удаление не теряло историю.
        const users = await User.find({});

        if (users.length) {
            const archivedPayload = users.map(user => ({
                UserName: user.UserName,
                UserLastName: user.UserLastName,
                UserEmail: user.UserEmail,
                idTab: user.idTab,
                deletedAt: new Date()
            }));

            await DeletedUser.insertMany(archivedPayload);
        }

        await User.deleteMany({});
        logSuccess(`DELETE - [SUCCESS] пользователи успешно удалены (архивировано: ${users.length})`);
        res.status(200).json({ message: "пользователи успешно удалены" });
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error(`DELETE /api/users/all - [ERROR]:`, error.message);
        res.status(500).json({ message: "Ошибка сервера при удалении всех пользователей" });
    }
};

exports.getDailyArchivedUsers = async (req, res) => {
    try {
        // Окно "за день" начинается в 04:00 локального времени.
        // Если сейчас раньше 04:00, берём 04:00 предыдущего дня.
        const now = new Date();
        const start = new Date(now);
        if (now.getHours() < 4) {
            start.setDate(start.getDate() - 1);
        }
        start.setHours(4, 0, 0, 0);

        const archivedUsers = await DeletedUser.find({
            deletedAt: { $gte: start }
        }).sort({ deletedAt: -1 }); // Новые первыми

        logSuccess(`GET - [SUCCESS] Получено ${archivedUsers.length} архивных пользователей с ${start.toISOString()}`);
        res.status(200).json(archivedUsers);
    } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`GET - [ERROR] Ошибка при получении архивных пользователей: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
