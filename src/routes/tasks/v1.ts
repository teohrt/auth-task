import { Router } from 'express';
import { Logger } from 'winston';
import { DBClient } from '../../db/dbClient';
import getTaskController from '../../controllers/taskController';

export default (logger: Logger, dbClient: DBClient): Router => {
  const taskController = getTaskController(logger, dbClient);

  const router = Router();
  router.get('/add', taskController.addTask);

  return router;
};
