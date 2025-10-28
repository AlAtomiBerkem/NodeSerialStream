const serial = require('../../middleware/com-port-logick/serial');

describe('Serial Middleware', () => {
  describe('connectToPort', () => {
    it('should be a function', () => {
      expect(typeof serial.connectToPort).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => {
        serial.connectToPort();
      }).not.toThrow();
    });
  });

  describe('getSerialData', () => {
    it('should be a function', () => {
      expect(typeof serial.getSerialData).toBe('function');
    });

    it('should return undefined when called', () => {
      const result = serial.getSerialData();
      expect(result).toBeUndefined();
    });
  });

  describe('closePort', () => {
    it('should be a function', () => {
      expect(typeof serial.closePort).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => {
        serial.closePort();
      }).not.toThrow();
    });
  });

  describe('Module exports', () => {
    it('should export all required functions', () => {
      expect(serial).toHaveProperty('connectToPort');
      expect(serial).toHaveProperty('getSerialData');
      expect(serial).toHaveProperty('closePort');
    });
  });
});