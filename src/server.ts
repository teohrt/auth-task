import express from 'express';
import * as dotenv from 'dotenv';
import getRoutes from './routes/index';
import logger from './utilities/logger';
import getDBClient from './db/dbClient';

dotenv.config({ path: `${__dirname}/../.env` });
const PORT = 8080 || process.env.PORT;
const dbClient = getDBClient(logger);
const routes = getRoutes(logger, dbClient);

const app = express();
app.use(routes);

app.listen(PORT, () => {
  logger.info(`🚀 Server ready at http://localhost:${PORT}`);
});
