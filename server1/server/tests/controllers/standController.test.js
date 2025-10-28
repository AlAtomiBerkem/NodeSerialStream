const User = require('../../models/userModel');
const standController = require('../../controllers/standController');

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

describe('StandController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('standState', () => {
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

      mockReq.body = {
        idTab: 123,
        room: 'checkingRoomOne',
        IndexStand: 0
      };

      await standController.standState(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
      
      // Проверяем, что стенд отмечен как пройденный
      const updatedUser = await User.findOne({ idTab: 123 });
      expect(updatedUser.checkingRoomOne[0]).toBe(true);
    });

    it('should return 404 if user not found', async () => {
      validateIdTabAndIndexStand.mockReturnValue(true);

      mockReq.body = {
        idTab: 999,
        room: 'checkingRoomOne',
        IndexStand: 0
      };

      await standController.standState(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        error: 'Пользователь с таким IdTab не найден'
      });
    });

    it('should return 400 if index is out of bounds', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123,
        checkingRoomOne: [false, false] // Массив из 2 элементов
      });
      await user.save();

      validateIdTabAndIndexStand.mockReturnValue(true);

      mockReq.body = {
        idTab: 123,
        room: 'checkingRoomOne',
        IndexStand: 5 // Индекс больше длины массива
      };

      await standController.standState(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Индекс выходит за пределы массива'
      });
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

      mockReq.body = {
        idTab: 123,
        room: 'checkingRoomOne',
        IndexStand: 0
      };

      await standController.standState(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'вы уже прошли этот тест'
      });
    });

    it('should return early if validation fails', async () => {
      validateIdTabAndIndexStand.mockReturnValue(false);

      mockReq.body = {
        idTab: 123,
        room: 'checkingRoomOne',
        IndexStand: 0
      };

      await standController.standState(mockReq, mockRes);

      // Проверяем, что функция завершилась рано из-за неудачной валидации
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });

  describe('checkTests', () => {
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

      mockReq.body = {
        idStand: 1, // Комната 1
        idTab: 123
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Все тесты пройдены, startTest отправлен'
      });
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

      mockReq.body = {
        idStand: 4, // Комната 2
        idTab: 123
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Все тесты пройдены, startTest отправлен'
      });
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

      mockReq.body = {
        idStand: 7, // Комната 3
        idTab: 123
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Все тесты пройдены, startTest отправлен'
      });
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

      mockReq.body = {
        idStand: 1,
        idTab: 123
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Не все тесты пройдены'
      });
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should return 400 if idTab is missing', async () => {
      mockReq.body = {
        idStand: 1
        // idTab отсутствует
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Не указан idTab'
      });
    });

    it('should return 404 if user not found', async () => {
      mockReq.body = {
        idStand: 1,
        idTab: 999
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Пользователь с таким idTab не найден'
      });
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

      mockReq.body = {
        idStand: 1,
        idTab: 123
      };

      await standController.checkTests(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Внутренняя ошибка сервера'
      });
    });
  });
});