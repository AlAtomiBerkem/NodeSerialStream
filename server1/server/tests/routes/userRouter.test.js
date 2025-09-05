const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const userRouter = require('../../routes/userRouter');

// Создаем тестовое Express приложение
const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

// Мокаем функции логирования
jest.mock('../../controllers/log-page/logError', () => ({
  logError: jest.fn(),
  logSuccess: jest.fn()
}));

describe('User Router', () => {
  describe('POST /api/users/createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        UserName: 'John',
        UserLastName: 'Doe',
        UserEmail: 'john.doe@example.com',
        idTab: 12345
      };

      const response = await request(app)
        .post('/api/users/createUser')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('UserName', 'John');
      expect(response.body).toHaveProperty('UserLastName', 'Doe');
      expect(response.body).toHaveProperty('UserEmail', 'john.doe@example.com');
      expect(response.body).toHaveProperty('idTab', 12345);
    });

    it('should return 400 for missing required fields', async () => {
      const userData = {
        UserName: 'John'
        // Отсутствуют остальные поля
      };

      const response = await request(app)
        .post('/api/users/createUser')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Поля UserName, UserLastName, UserEmail и idTab обязательны');
    });

    it('should return 400 for duplicate idTab', async () => {
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
        idTab: 12345 // Дубликат
      };

      const response = await request(app)
        .post('/api/users/createUser')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'idTab уже существует в сети');
    });
  });

  describe('GET /api/users', () => {
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

      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /api/users/:idTab', () => {
    it('should return user by idTab', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      });
      await user.save();

      const response = await request(app)
        .get('/api/users/123')
        .expect(200);

      expect(response.body).toHaveProperty('idTab', 123);
      expect(response.body).toHaveProperty('UserName', 'Test');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Пользователь не найден');
    });

    it('should return 400 for invalid idTab', async () => {
      const response = await request(app)
        .get('/api/users/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('message', 'idTab должен быть числом');
    });
  });

  describe('DELETE /api/users/:idTab', () => {
    it('should delete user by idTab', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      });
      await user.save();

      const response = await request(app)
        .delete('/api/users/123')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Пользователь успешно удален');

      // Проверяем, что пользователь удален
      const deletedUser = await User.findOne({ idTab: 123 });
      expect(deletedUser).toBeNull();
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/api/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Пользователь с таким IdTab не найден');
    });
  });

  describe('GET /api/users/testResult/:idTab', () => {
    it('should return test result for user', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        resultTest: [85, 90, 78]
      });
      await user.save();

      const response = await request(app)
        .get('/api/users/testResult/123')
        .expect(200);

      expect(response.body).toHaveProperty('idTab', 123);
      expect(response.body).toHaveProperty('resultTest', [85, 90, 78]);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/testResult/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Данные для idTab "999" не найдены');
    });
  });

  describe('DELETE /api/users/all', () => {
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

      const response = await request(app)
        .delete('/api/users/all')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'пользователи успешно удалены');

      // Проверяем, что все пользователи удалены
      const users = await User.find();
      expect(users).toHaveLength(0);
    });
  });
});