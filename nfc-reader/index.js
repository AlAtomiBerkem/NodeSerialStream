const http = require('http');
const { Server } = require('socket.io');
const app = require('./routes');
const { connectToPort, closePort } = require('./serialPortSetup');
const { connectToDatabase } = require('./db');

const SERVER_PORT = 5001;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


app.use((req, res, next) => {
  req.io = io;
  next();
});


async function gracefulShutdown() {
  console.log('Завершение работы...');
  await closePort();
  await client.close(); 
  server.close(() => {
    console.log('Сервер остановлен');
    process.exit(0);
  });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);


server.listen(SERVER_PORT, async () => {
  console.log(`Сервер запущен на http://localhost:${SERVER_PORT}`);
  await connectToDatabase(); // Подключаемся к MongoDB
  await connectToPort(io);
});
