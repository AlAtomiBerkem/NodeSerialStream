const socketManager = require('../../middleware/com-port-logick/socketManager');

describe('Socket Manager Middleware', () => {
  describe('initSocket', () => {
    it('should be a function', () => {
      expect(typeof socketManager.initSocket).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => {
        socketManager.initSocket();
      }).not.toThrow();
    });

    it('should accept server parameter', () => {
      const mockServer = { test: 'server' };
      expect(() => {
        socketManager.initSocket(mockServer);
      }).not.toThrow();
    });
  });

  describe('emitData', () => {
    it('should be a function', () => {
      expect(typeof socketManager.emitData).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => {
        socketManager.emitData();
      }).not.toThrow();
    });

    it('should accept data parameter', () => {
      const testData = { message: 'test data' };
      expect(() => {
        socketManager.emitData(testData);
      }).not.toThrow();
    });
  });

  describe('emitError', () => {
    it('should be a function', () => {
      expect(typeof socketManager.emitError).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => {
        socketManager.emitError();
      }).not.toThrow();
    });

    it('should accept error parameter', () => {
      const testError = { message: 'test error' };
      expect(() => {
        socketManager.emitError(testError);
      }).not.toThrow();
    });
  });

  describe('Module exports', () => {
    it('should export all required functions', () => {
      expect(socketManager).toHaveProperty('initSocket');
      expect(socketManager).toHaveProperty('emitData');
      expect(socketManager).toHaveProperty('emitError');
    });
  });
});