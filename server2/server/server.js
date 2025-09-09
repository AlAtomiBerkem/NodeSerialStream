const express = require('express');
const standRoutes = require('./routes/StandRoutes');
const config = require('./config/config');
const cors = require('cors');
const { ComReader } = require('./serial/comReader');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));

 app.use(express.json());

 
 app.use('/api/stand', standRoutes);

 const PORT = config.SERVER.PORT;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

const comReader = new ComReader({ portPath: 'COM6', baudRate: 9600, logIntervalMs: 3000, disconnectTimeoutMs: 30000 });
comReader.start();
