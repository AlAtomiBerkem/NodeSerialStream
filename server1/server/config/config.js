module.exports = {
    STAND_CONFIG: {
      checkingRoomOne: 2,
      checkingRoomTwo: 4,
      checkingRoomThree: 2,
      checkingTestStand: 3,
      resultTest: 3
    },
    
    SERVER: {
        PORT: process.env.PORT || 3001,  // Изменено на 3001
        HOST: process.env.HOST || '0.0.0.0',
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/User'
    },
  
    SERIAL: {
      PORT_NAME: 'COM5',
      BAUD_RATE: 9600,
      SERVER_PORT: 5000
    }
  };