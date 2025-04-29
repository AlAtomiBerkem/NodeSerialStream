const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; 
const dbName = 'User';

let client;

async function connectToDatabase() {
  if (client) return client;

  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Подключено к MongoDB');
  return client;
}

async function getDatabase() {
  if (!client) await connectToDatabase();
  return client.db(dbName);
}

module.exports = {
  connectToDatabase,
  getDatabase,
};
