/* eslint-disable func-names */
import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './utilities/logger';
import getDBClient from './db/dbClient';
import getAuthRoutes from './routes/auth/index';

(async function () {
  dotenv.config({ path: `${__dirname}/../.env` });
  const PORT = 8080 || process.env.AUTH_PORT;
  const dbClient = await getDBClient(logger);
  const authRoutes = getAuthRoutes(logger, dbClient);

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(authRoutes);

  app.listen(PORT, () => {
    logger.info(`Auth service listening at http://localhost:${PORT}`);
  });
}());
