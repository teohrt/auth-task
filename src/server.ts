import express from 'express';
import * as dotenv from 'dotenv';
import getDBClient from './db/dbClient';
import logger from './utilities/logger';

dotenv.config({ path: `${__dirname}/../.env` });
const PORT = 8080 || process.env.PORT;
const dbClient = getDBClient(logger);
const app = express();

app.get('/', (req, res) => {
  res.send('One small step');
});

app.get('/add', (req, res) => {
  dbClient.addTask();
  res.send('Task added!!');
});

app.listen(PORT, () => {
  logger.info(`🚀 Server ready at http://localhost:${PORT}`);
});
