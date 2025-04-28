const mongoose = require('mongoose');
const config = require('./config/config'); // Ваш файл с настройками

const connectDB = async () => {
    try {
        await mongoose.connect(config.SERVER.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB подключена успешно');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;