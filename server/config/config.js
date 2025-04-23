module.exports = {
    STAND_CONFIG: {
      checkingRoomOne: 2,
      checkingRoomTwo: 4,
      checkingRoomThree: 2,
      checkingTestStand: 3,
      resultTest: 3
    },
    
    SERVER: {
      PORT: 3000,
      MONGODB_URI: 'mongodb://localhost:27017/User'  // Добавлен слеш перед именем БД
    },
  
    SERIAL: {
      PORT_NAME: 'COM7',
      BAUD_RATE: 9600,
      SERVER_PORT: 5000
    }
  };