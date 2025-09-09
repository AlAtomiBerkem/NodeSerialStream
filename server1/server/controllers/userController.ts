const User = require('../models/userModel');
const { logError, logSuccess } = require('./log-page/logError');
import type { Request, Response } from "express";
import type { Users, DeleteUserParams } from '../types/index'


exports.createUser = async (req: Request<{}, {}, Users>, res: Response): Promise<void> => {
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

        res.status(201).json(newUser);
        logSuccess(`POST - [SUCCESS пользователь ${UserName} ${UserLastName} ${UserEmail} создан ${res.statusCode}]`);
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`POST - [ERROR ошибка при создании нового пользователя | ${error.message} | 400]`);
        res.status(400).json({ message: error.message });
        return;
    }
};

exports.getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        logSuccess(`GET - [SUCCESS успешный запрос: таблица пользователей ${res.statusCode}]`);
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`GET - [ERROR ошибка при получении пользователей | ${error.message}]`);
        res.status(500).json({ message: error.message });
    }
};

exports.getOneUser = async (req: Request<DeleteUserParams>, res: Response): Promise<void> => {
    const { idTab } = req.params;
    if (!idTab) {
        res.status(400).json({ message: "idTab обязателен" });
        return;
    }

    try {
        const user = await User.findOne({ idTab });
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' });
            return;
        }
        res.status(200).json(user);
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req: Request<DeleteUserParams>, res: Response): Promise<void> => {
    const { idTab } = req.params;
    if (!idTab) {
        res.status(400).json({ message: "idTab обязателен" });
        return;
    }

    try {
        const user = await User.findOneAndDelete({ idTab });
        if (!user) {
            logError(`Пользователь с таким IdTab не найден: ${idTab}`);
            res.status(404).send({ error: 'Пользователь с таким IdTab не найден' });
            return;
        }
        logSuccess(`DELETE - [SUCCESS] Пользователь с idTab ${idTab} успешно удален`);
        res.json({ message: 'Пользователь успешно удален' });
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        logError(`DELETE - [ERROR] Произошла ошибка на стороне сервера для idTab - ${idTab}: ${error.message}`);
        res.status(500).json({ message: 'Произошла ошибка на стороне сервера' });
    }
};

exports.testResult = async (req: Request<DeleteUserParams>, res: Response): Promise<void> => {
    const { idTab } = req.params;
    if (!idTab) {
        res.status(400).json({ message: "idTab обязателен" });
        return;
    }

    try {
        const result = await User.findOne({ idTab });
        if (!result) {
            res.status(404).json({ error: `Данные для idTab "${idTab}" не найдены` });
            return;
        }

        res.status(200).json({
            idTab: result.idTab,
            resultTest: result.resultTest
        });
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error(`GET /api/test/${idTab} - [ERROR]:`, error.message);
        res.status(500).json({ message: "Ошибка сервера при получении данных" });
    }
};

exports.deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        await User.deleteMany({});
        logSuccess(`DELETE - [SUCCESS] пользователи успешно удалены`);
        res.status(200).json({ message: "пользователи успешно удалены" });
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error(`DELETE /api/users/all - [ERROR]:`, error.message);
        res.status(500).json({ message: "Ошибка сервера при удалении всех пользователей" });
    }
};
