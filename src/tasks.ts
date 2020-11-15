import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import getDBClient from './db/dbClient';
import getMiddleware from './middleware/jwt';
import getRoutes from './routes/tasks/index';
import logger from './utilities/logger';

dotenv.config({ path: `${__dirname}/../.env` });
const PORT = 3000 || process.env.TASK_PORT;
const dbClient = getDBClient(logger);
const middleware = getMiddleware(logger);
const routes = getRoutes(logger, dbClient);

const app = express();
app.use(bodyParser.json());
app.use(middleware.jwtValidation);
app.use(middleware.unauthorizedErrorHandling);
app.use(routes);

app.listen(PORT, () => {
  logger.info(`Task service listening at http://localhost:${PORT}`);
});
