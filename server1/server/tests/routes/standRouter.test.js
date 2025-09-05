const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const standRouter = require('../../routes/standRouter');

// Создаем тестовое Express приложение
const app = express();
app.use(express.json());
app.use('/api/stand', standRouter);

// Мокаем axios
jest.mock('axios');
const axios = require('axios');

// Мокаем функции логирования
jest.mock('../../controllers/log-page/logError', () => ({
  logError: jest.fn(),
  logSuccess: jest.fn()
}));

// Мокаем функции валидации
jest.mock('../../controllers/log-page/idTabErrors', () => ({
  validateIdTabAndIndexStand: jest.fn()
}));

const { validateIdTabAndIndexStand } = require('../../controllers/log-page/idTabErrors');

describe('Stand Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PATCH /api/stand/update', () => {
    it('should update stand state successfully', async () => {
      // Создаем пользователя
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [false, false]
      });
      await user.save();

      // Мокаем валидацию
      validateIdTabAndIndexStand.mockReturnValue(true);

      const response = await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 123,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(200);

      expect(response.body).toHaveProperty('idTab', 123);
      
      // Проверяем, что стенд отмечен как пройденный
      const updatedUser = await User.findOne({ idTab: 123 });
      expect(updatedUser.checkingRoomOne[0]).toBe(true);
    });

    it('should return 404 if user not found', async () => {
      validateIdTabAndIndexStand.mockReturnValue(true);

      const response = await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 999,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Пользователь с таким IdTab не найден');
    });

    it('should return 400 if index is out of bounds', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [false, false]
      });
      await user.save();

      validateIdTabAndIndexStand.mockReturnValue(true);

      const response = await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 123,
          room: 'checkingRoomOne',
          IndexStand: 5 // Индекс больше длины массива
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Индекс выходит за пределы массива');
    });

    it('should return 400 if test already passed', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [true, false] // Первый тест уже пройден
      });
      await user.save();

      validateIdTabAndIndexStand.mockReturnValue(true);

      const response = await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 123,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'вы уже прошли этот тест');
    });
  });

  describe('POST /api/stand/checkTests', () => {
    beforeEach(() => {
      axios.post.mockResolvedValue({ data: { success: true } });
    });

    it('should return success when all tests in room one are passed', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [true, true] // Все тесты пройдены
      });
      await user.save();

      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1, // Комната 1
          idTab: 123
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Все тесты пройдены, startTest отправлен');
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/startTest', {
        startTest: true,
        idTab: 123
      });
    });

    it('should return success when all tests in room two are passed', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomTwo: [true, true, true, true] // Все тесты пройдены
      });
      await user.save();

      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 4, // Комната 2
          idTab: 123
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Все тесты пройдены, startTest отправлен');
    });

    it('should return success when all tests in room three are passed', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomThree: [true, true] // Все тесты пройдены
      });
      await user.save();

      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 7, // Комната 3
          idTab: 123
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Все тесты пройдены, startTest отправлен');
    });

    it('should return message when not all tests are passed', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [true, false] // Не все тесты пройдены
      });
      await user.save();

      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1,
          idTab: 123
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Не все тесты пройдены');
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should return 400 if idTab is missing', async () => {
      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1
          // idTab отсутствует
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Не указан idTab');
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1,
          idTab: 999
        })
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Пользователь с таким idTab не найден');
    });

    it('should handle axios error', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [true, true]
      });
      await user.save();

      // Мокаем ошибку axios
      axios.post.mockRejectedValue(new Error('Network error'));

      const response = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1,
          idTab: 123
        })
        .expect(500);

      expect(response.body).toHaveProperty('message', 'Внутренняя ошибка сервера');
    });
  });
});