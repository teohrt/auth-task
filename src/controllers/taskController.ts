import { Logger } from 'winston';
import { Request, Response } from 'express';
import { DBClient } from '../db/dbClient';
import getValidator from './taskValidator';

export interface TaskController {
  createTask: (req: Request, res: Response) => void;
  getAllTasksFromUser: (req: Request, res: Response) => void;
  getTask: (req: Request, res: Response) => void;
  updateTask: (req: Request, res: Response) => void;
  deleteTask: (req: Request, res: Response) => void;
}

export default (logger: Logger, dbClient: DBClient): TaskController => {
  const validator = getValidator(logger, dbClient);

  return {
    createTask: async (req, res) => {
      logger.info('Task Controller: createTask');
      const { status, name, description } = req.body;
      const userId = req.user.id;

      const validatorResult = validator.validateCreateTask(status);
      if (!validatorResult.isValid) {
        res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
        return;
      }

      const result = await dbClient.createTask(userId, status, name, description);
      const taskId = result.rows[0].id;
      res.status(201).send({ taskId });
    },

    getAllTasksFromUser: async (req, res) => {
      logger.info('Task Controller: getAllTasksFromUser');
      const ownerId = req.user.id;
      const result = await dbClient.getAllTasksFromUser(ownerId);
      const tasks = result.rows;
      res.status(200).send({ tasks });
    },

    getTask: async (req, res) => {
      logger.info('Task Controller: getTask');
      const { taskId } = req.params;
      const userId = req.user.id;

      const validatorResult = await validator.validateGetTask(userId, Number(taskId));
      if (!validatorResult.isValid) {
        res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
        return;
      }

      const result = await dbClient.getTask(Number(taskId));
      const task = result.rows[0];
      res.status(200).send({ task });
    },

    updateTask: async (req, res) => {
      logger.info('Task Controller: updateTask');
      const { status, name, description } = req.body;
      const { taskId } = req.params;
      const userId = req.user.id;

      const validatorResult = await validator.validateUpdateTask(userId, Number(taskId), status);
      if (!validatorResult.isValid) {
        res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
        return;
      }

      await dbClient.updateTask(Number(taskId), status, name, description);
      res.status(200).send();
    },

    deleteTask: async (req, res) => {
      logger.info('Task Controller: deleteTask');
      const { taskId } = req.params;
      const userId = req.user.id;

      const validatorResult = await validator.validateDeleteTask(userId, Number(taskId));
      if (!validatorResult.isValid) {
        res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
        return;
      }

      await dbClient.deleteTask(Number(taskId));
      res.status(200).send();
    },
  };
};
