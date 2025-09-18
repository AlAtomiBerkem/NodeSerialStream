module.exports = {

    SERVER: {
        PORT: process.env.PORT || 3050,
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongodb:27017/User',
    },
    STAND: {
        ROOM: Number(process.env.STAND_ROOM || 1),
    },
}