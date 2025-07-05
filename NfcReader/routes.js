const express = require('express');
const { connectToPort, getLatestData, getPortStatus } = require('./serialPortSetup');
const { getDatabase } = require('./db');

const app = express();
const PORT_NAME = 'COM7';

app.get('/api/data', async (req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection('your_collection');
    const data = await collection.find({}).toArray();

    res.json({
      data: getLatestData(),
      port: PORT_NAME,
      status: getPortStatus(),
      dbData: data,
    });
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
  }
});

app.post('/api/reconnect', async (req, res) => {
  await connectToPort(req.io);
  res.json({ status: 'reconnecting' });
});

module.exports = app;
