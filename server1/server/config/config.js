module.exports = {
    STAND_CONFIG: {
      checkingRoomOne: 2,
      checkingRoomTwo: 4,
      checkingRoomThree: 2,
      checkingTestStand: 3,
      resultTest: 3
    },
    
    SERVER: {
        PORT: process.env.PORT || 3000,
        // MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongodb:27017/User'
        MONGODB_URI: 'mongodb://127.0.0.1:27017/User?connectTimeoutMS=3000'
    },
  
    SERIAL: {
      PORT_NAME: 'COM5',
      BAUD_RATE: 9600,
      SERVER_PORT: 5000
    }
  };