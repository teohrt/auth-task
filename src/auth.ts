import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import getDBClient from './db/dbClient';
import getAuthRoutes from './routes/auth/index';
import logger from './utilities/logger';

dotenv.config({ path: `${__dirname}/../.env` });
const PORT = 8080 || process.env.AUTH_PORT;
const dbClient = getDBClient(logger);
const authRoutes = getAuthRoutes(logger, dbClient);

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

app.listen(PORT, () => {
  logger.info(`Auth service listening at http://localhost:${PORT}`);
});
