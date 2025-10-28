const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../models/userModel');

// Создаем тестовое приложение без подключения к реальной базе данных
const express = require('express');
const cors = require('cors');
const userRoutes = require('../../routes/userRouter');
const standRoutes = require('../../routes/standRouter');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.use('/api/users', userRoutes);
app.use('/api/stand', standRoutes);

// Мокаем функции логирования
jest.mock('../../controllers/log-page/logError', () => ({
  logError: jest.fn(),
  logSuccess: jest.fn()
}));

// Мокаем функции валидации
jest.mock('../../controllers/log-page/idTabErrors', () => ({
  validateIdTabAndIndexStand: jest.fn()
}));

// Мокаем axios
jest.mock('axios');
const axios = require('axios');

const { validateIdTabAndIndexStand } = require('../../controllers/log-page/idTabErrors');

describe('Server Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.post.mockResolvedValue({ data: { success: true } });
  });

  describe('Complete user workflow', () => {
    it('should handle complete user lifecycle', async () => {
      // 1. Создаем пользователя
      const userData = {
        UserName: 'Integration',
        UserLastName: 'Test',
        UserEmail: 'integration@example.com',
        idTab: 999
      };

      const createResponse = await request(app)
        .post('/api/users/createUser')
        .send(userData)
        .expect(201);

      expect(createResponse.body).toHaveProperty('idTab', 999);

      // 2. Получаем всех пользователей
      const getAllResponse = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(getAllResponse.body)).toBe(true);
      expect(getAllResponse.body.length).toBeGreaterThan(0);

      // 3. Получаем конкретного пользователя
      const getOneResponse = await request(app)
        .get('/api/users/999')
        .expect(200);

      expect(getOneResponse.body).toHaveProperty('idTab', 999);

      // 4. Обновляем состояние стенда
      validateIdTabAndIndexStand.mockReturnValue(true);

      const standResponse = await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 999,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(200);

      expect(standResponse.body).toHaveProperty('idTab', 999);

      // 5. Проверяем результаты тестов
      const checkTestsResponse = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1,
          idTab: 999
        })
        .expect(200);

      expect(checkTestsResponse.body).toHaveProperty('message');

      // 6. Получаем результаты тестов
      const testResultResponse = await request(app)
        .get('/api/users/testResult/999')
        .expect(200);

      expect(testResultResponse.body).toHaveProperty('idTab', 999);
      expect(testResultResponse.body).toHaveProperty('resultTest');

      // 7. Удаляем пользователя
      const deleteResponse = await request(app)
        .delete('/api/users/999')
        .expect(200);

      expect(deleteResponse.body).toHaveProperty('message', 'Пользователь успешно удален');
    });
  });

  describe('Error handling', () => {
    it('should handle validation errors gracefully', async () => {
      // Попытка создать пользователя без обязательных полей
      const invalidUserData = {
        UserName: 'Test'
        // Отсутствуют остальные поля
      };

      const response = await request(app)
        .post('/api/users/createUser')
        .send(invalidUserData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should handle non-existent user operations', async () => {
      // Попытка получить несуществующего пользователя
      const response = await request(app)
        .get('/api/users/99999')
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Пользователь не найден');
    });

    it('should handle invalid idTab format', async () => {
      const response = await request(app)
        .get('/api/users/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('message', 'idTab должен быть числом');
    });
  });

  describe('Stand operations', () => {
    let userId;

    beforeEach(async () => {
      // Создаем пользователя для тестов стендов
      const user = new User({
        UserName: 'Stand',
        UserLastName: 'Test',
        UserEmail: 'stand@example.com',
        idTab: 888
      });
      await user.save();
      userId = user.idTab;
    });

    it('should handle stand state updates for different rooms', async () => {
      validateIdTabAndIndexStand.mockReturnValue(true);

      // Обновляем стенд в первой комнате
      await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: userId,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(200);

      // Обновляем стенд во второй комнате
      await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: userId,
          room: 'checkingRoomTwo',
          IndexStand: 1
        })
        .expect(200);

      // Обновляем стенд в третьей комнате
      await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: userId,
          room: 'checkingRoomThree',
          IndexStand: 0
        })
        .expect(200);

      // Проверяем, что все обновления применились
      const updatedUser = await User.findOne({ idTab: userId });
      expect(updatedUser.checkingRoomOne[0]).toBe(true);
      expect(updatedUser.checkingRoomTwo[1]).toBe(true);
      expect(updatedUser.checkingRoomThree[0]).toBe(true);
    });

    it('should prevent duplicate stand completions', async () => {
      validateIdTabAndIndexStand.mockReturnValue(true);

      // Первое прохождение стенда
      await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: userId,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(200);

      // Попытка повторного прохождения того же стенда
      const response = await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: userId,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'вы уже прошли этот тест');
    });

    it('should handle checkTests for different stand ranges', async () => {
      // Настраиваем пользователя с пройденными тестами
      const user = await User.findOne({ idTab: userId });
      user.checkingRoomOne = [true, true]; // Все тесты пройдены
      await user.save();

      // Проверяем тесты для комнаты 1 (стенды 1-3)
      const response1 = await request(app)
        .post('/api/stand/checkTests')
        .send({
          idStand: 1,
          idTab: userId
        })
        .expect(200);

      expect(response1.body).toHaveProperty('message', 'Все тесты пройдены, startTest отправлен');
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/startTest', {
        startTest: true,
        idTab: userId
      });
    });
  });

  describe('Data consistency', () => {
    it('should maintain data consistency across operations', async () => {
      // Создаем пользователя
      const userData = {
        UserName: 'Consistency',
        UserLastName: 'Test',
        UserEmail: 'consistency@example.com',
        idTab: 777
      };

      await request(app)
        .post('/api/users/createUser')
        .send(userData)
        .expect(201);

      // Обновляем несколько стендов
      validateIdTabAndIndexStand.mockReturnValue(true);

      await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 777,
          room: 'checkingRoomOne',
          IndexStand: 0
        })
        .expect(200);

      await request(app)
        .patch('/api/stand/update')
        .send({
          idTab: 777,
          room: 'checkingRoomOne',
          IndexStand: 1
        })
        .expect(200);

      // Проверяем, что данные сохранились корректно
      const user = await User.findOne({ idTab: 777 });
      expect(user.checkingRoomOne[0]).toBe(true);
      expect(user.checkingRoomOne[1]).toBe(true);
      expect(user.checkingRoomOne.every(test => test === true)).toBe(true);
    });
  });
});