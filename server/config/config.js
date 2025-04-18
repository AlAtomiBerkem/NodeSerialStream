module.exports = {
    STAND_CONFIG: {
      checkingRoomOne: 2,
      checkingRoomTwo: 4,
      checkingRoomThree: 2,
      checkingTestStand: 3,
      resultTest: 3
    },
    
    SERVER: {
      PORT: 3000,  // Порт HTTP-сервера
      MONGODB_URI: 'mongodb://127.0.0.1:27017/userDataBase'  // Добавлен слеш перед именем БД
    },
  
    SERIAL: {
      PORT_NAME: 'COM7',
      BAUD_RATE: 9600,
      SERVER_PORT: 5000  // Порт для WebSocket/Socket.io
    }
  };