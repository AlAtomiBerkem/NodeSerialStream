const mongoose = require('mongoose');
const User = require('../../models/userModel');

describe('User Model', () => {
  describe('Schema validation', () => {
    it('should create a user with all required fields', async () => {
      const userData = {
        UserName: 'John',
        UserLastName: 'Doe',
        UserEmail: 'john.doe@example.com',
        idTab: 12345
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.UserName).toBe('John');
      expect(savedUser.UserLastName).toBe('Doe');
      expect(savedUser.UserEmail).toBe('john.doe@example.com');
      expect(savedUser.idTab).toBe(12345);
      expect(savedUser._id).toBeDefined();
    });

    it('should generate default arrays for test rooms', async () => {
      const userData = {
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      };

      const user = new User(userData);
      const savedUser = await user.save();

      // Проверяем, что массивы созданы с правильными размерами
      expect(savedUser.checkingRoomOne).toHaveLength(2);
      expect(savedUser.checkingRoomTwo).toHaveLength(4);
      expect(savedUser.checkingRoomThree).toHaveLength(2);
      expect(savedUser.checkingTestStand).toHaveLength(2);
      expect(savedUser.resultTest).toHaveLength(3);

      // Проверяем, что все значения false по умолчанию
      expect(savedUser.checkingRoomOne.every(test => test === false)).toBe(true);
      expect(savedUser.checkingRoomTwo.every(test => test === false)).toBe(true);
      expect(savedUser.checkingRoomThree.every(test => test === false)).toBe(true);
      expect(savedUser.checkingTestStand.every(test => test === false)).toBe(true);
      expect(savedUser.resultTest.every(result => result === 0)).toBe(true);
    });

    it('should generate a random generateID', async () => {
      const userData = {
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.generateID).toBeDefined();
      expect(typeof savedUser.generateID).toBe('number');
      expect(savedUser.generateID).toBeGreaterThan(0);
      expect(savedUser.generateID).toBeLessThan(10000);
    });

    it('should require UserName field', async () => {
      const userData = {
        UserLastName: 'Doe',
        UserEmail: 'john.doe@example.com',
        idTab: 12345
        // UserName отсутствует
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should require UserLastName field', async () => {
      const userData = {
        UserName: 'John',
        UserEmail: 'john.doe@example.com',
        idTab: 12345
        // UserLastName отсутствует
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should require UserEmail field', async () => {
      const userData = {
        UserName: 'John',
        UserLastName: 'Doe',
        idTab: 12345
        // UserEmail отсутствует
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should require idTab field', async () => {
      const userData = {
        UserName: 'John',
        UserLastName: 'Doe',
        UserEmail: 'john.doe@example.com'
        // idTab отсутствует
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('Array operations', () => {
    let user;

    beforeEach(async () => {
      const userData = {
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 123
      };
      user = new User(userData);
      await user.save();
    });

    it('should update checkingRoomOne array', async () => {
      user.checkingRoomOne[0] = true;
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.checkingRoomOne[0]).toBe(true);
      expect(updatedUser.checkingRoomOne[1]).toBe(false);
    });

    it('should update checkingRoomTwo array', async () => {
      user.checkingRoomTwo[1] = true;
      user.checkingRoomTwo[3] = true;
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.checkingRoomTwo[0]).toBe(false);
      expect(updatedUser.checkingRoomTwo[1]).toBe(true);
      expect(updatedUser.checkingRoomTwo[2]).toBe(false);
      expect(updatedUser.checkingRoomTwo[3]).toBe(true);
    });

    it('should update checkingRoomThree array', async () => {
      user.checkingRoomThree[1] = true;
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.checkingRoomThree[0]).toBe(false);
      expect(updatedUser.checkingRoomThree[1]).toBe(true);
    });

    it('should update resultTest array', async () => {
      user.resultTest[0] = 85;
      user.resultTest[1] = 90;
      user.resultTest[2] = 78;
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.resultTest[0]).toBe(85);
      expect(updatedUser.resultTest[1]).toBe(90);
      expect(updatedUser.resultTest[2]).toBe(78);
    });
  });

  describe('Unique constraints', () => {
    it('should allow multiple users with different idTab', async () => {
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

      const users = await User.find();
      expect(users).toHaveLength(2);
    });

    it('should allow multiple users with same email (if not unique)', async () => {
      const user1 = new User({
        UserName: 'User1',
        UserLastName: 'Last1',
        UserEmail: 'same@example.com',
        idTab: 1
      });

      const user2 = new User({
        UserName: 'User2',
        UserLastName: 'Last2',
        UserEmail: 'same@example.com',
        idTab: 2
      });

      await user1.save();
      await user2.save();

      const users = await User.find({ UserEmail: 'same@example.com' });
      expect(users).toHaveLength(2);
    });
  });

  describe('Data types', () => {
    it('should store idTab as number', async () => {
      const user = new User({
        UserName: 'Test',
        UserLastName: 'User',
        UserEmail: 'test@example.com',
        idTab: 12345
      });

      const savedUser = await user.save();
      expect(typeof savedUser.idTab).toBe('number');
      expect(savedUser.idTab).toBe(12345);
    });

    it('should store strings correctly', async () => {
      const user = new User({
        UserName: 'Test Name',
        UserLastName: 'Test Last Name',
        UserEmail: 'test.email@example.com',
        idTab: 123
      });

      const savedUser = await user.save();
      expect(typeof savedUser.UserName).toBe('string');
      expect(typeof savedUser.UserLastName).toBe('string');
      expect(typeof savedUser.UserEmail).toBe('string');
    });
  });
});