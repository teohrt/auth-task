import express from 'express';
import * as dotenv from 'dotenv';
import getRoutes from './routes/tasks/index';
import logger from './utilities/logger';
import getDBClient from './db/dbClient';

dotenv.config({ path: `${__dirname}/../.env` });
const PORT = 3000 || process.env.TASK_PORT;
const dbClient = getDBClient(logger);
const routes = getRoutes(logger, dbClient);

const app = express();
app.use(routes);

app.listen(PORT, () => {
  logger.info(`Task service listening at http://localhost:${PORT}`);
});
