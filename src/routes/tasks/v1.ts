import { Router } from 'express';
import { Logger } from 'winston';
import { DBClient } from '../../db/dbClient';
import getTaskController from '../../controllers/taskController';

export default (logger: Logger, dbClient: DBClient): Router => {
  const taskController = getTaskController(logger, dbClient);

  const router = Router();
  router.post('/tasks', taskController.v1CreateTask);
  router.get('/tasks', taskController.getAllTasksFromUser);
  router.get('/tasks/:taskId', taskController.getTask);
  router.put('/tasks/:taskId', taskController.v1UpdateTask);
  router.delete('/tasks/:taskId', taskController.deleteTask);

  return router;
};
