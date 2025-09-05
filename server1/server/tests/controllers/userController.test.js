const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const userController = require('../../controllers/userController');

// Создаем тестовое Express приложение
const app = express();
app.use(express.json());

// Мокаем функции логирования
jest.mock('../../controllers/log-page/logError', () => ({
  logError: jest.fn(),
  logSuccess: jest.fn()
}));

describe('UserController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        UserName: 'John',
        UserLastName: 'Doe',
        UserEmail: 'john.doe@example.com',
        idTab: 12345
      };

      mockReq.body = userData;

      await userController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalled();

      // Проверяем, что пользователь создан в базе данных
      const createdUser = await User.findOne({ idTab: 12345 });
      expect(createdUser).toBeTruthy();
      expect(createdUser.UserName).toBe('John');
      expect(createdUser.UserLastName).toBe('Doe');
      expect(createdUser.UserEmail).toBe('john.doe@example.com');
    });

    it('should return 400 if required fields are missing', async () => {
      const userData = {
        UserName: 'John',
        // Отсутствуют UserLastName, UserEmail, idTab
      };

      mockReq.body = userData;

      await userController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Поля UserName, UserLastName, UserEmail и idTab обязательны'
      });
    });

    it('should return 400 if user with idTab already exists', async () => {
      // Создаем пользователя заранее
      const existingUser = new User({
        UserName: 'Existing',
        UserLastName: 'User',
        UserEmail: 'existing@example.com',
        idTab: 12345
      });
      await existingUser.save();

      const userData = {
        UserName: 'John',
        UserLastName: 'Doe',
        UserEmail: 'john.doe@example.com',
        idTab: 12345 // Тот же idTab
      };

      mockReq.body = userData;

      await userController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'idTab уже существует в сети'
      });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Создаем тестовых пользователей
      const user1 = new User({
        UserName: 'User1',
        UserLastName: 'Last1',
        UserEmail: 'user1@example.com',
        idTab: 1
      });
      const user2 = new User({
        UserName: 'User2',
        UserLastName: 'Last2',
        UserEmail: 'user2@example.com',
        idTab: 2
      });
      await user1.save();
      await user2.save();

      await userController.getAllUsers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('getOneUser', () => {
    it('should return user by idTab', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      });
      await user.save();

      mockReq.params = { idTab: '123' };

      await userController.getOneUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should return 404 if user not found', async () => {
      mockReq.params = { idTab: '999' };

      await userController.getOneUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Пользователь не найден'
      });
    });

    it('should return 400 if idTab is not a number', async () => {
      mockReq.params = { idTab: 'invalid' };

      await userController.getOneUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'idTab должен быть числом'
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      });
      await user.save();

      mockReq.params = { idTab: '123' };

      await userController.deleteUser(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Пользователь успешно удален'
      });

      // Проверяем, что пользователь удален из базы данных
      const deletedUser = await User.findOne({ idTab: 123 });
      expect(deletedUser).toBeNull();
    });

    it('should return 404 if user not found', async () => {
      mockReq.params = { idTab: '999' };

      await userController.deleteUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: 'Пользователь с таким IdTab не найден'
      });
    });
  });

  describe('testResult', () => {
    it('should return test result for user', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        resultTest: [85, 90, 78]
      });
      await user.save();

      mockReq.params = { idTab: '123' };

      await userController.testResult(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        idTab: 123,
        resultTest: [85, 90, 78]
      });
    });

    it('should return 404 if user not found', async () => {
      mockReq.params = { idTab: '999' };

      await userController.testResult(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Данные для idTab "999" не найдены'
      });
    });
  });

  describe('deleteAllUsers', () => {
    it('should delete all users', async () => {
      // Создаем несколько пользователей
      const user1 = new User({
        UserName: 'User1',
        UserLastName: 'Last1',
        UserEmail: 'user1@example.com',
        idTab: 1
      });
      const user2 = new User({
        UserName: 'User2',
        UserLastName: 'Last2',
        UserEmail: 'user2@example.com',
        idTab: 2
      });
      await user1.save();
      await user2.save();

      await userController.deleteAllUsers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'пользователи успешно удалены'
      });

      // Проверяем, что все пользователи удалены
      const users = await User.find();
      expect(users).toHaveLength(0);
    });
  });
});