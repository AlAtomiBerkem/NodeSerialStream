// server.js
const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/UserRoutes');
const config = require('./config/config');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

 app.use(express.json());

 app.use('/api/users', userRoutes);

 connectDB();

 const PORT = config.SERVER.PORT;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});