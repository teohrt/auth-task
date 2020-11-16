import { Logger } from 'winston';
import { Request, Response, NextFunction } from 'express';
import { DBClient } from '../db/dbClient';
import getValidator from './taskValidator';
import getErrorHandler from '../utilities/errorHandler';

export interface TaskController {
  createTask: (req: Request, res: Response) => void;
  getAllTasksFromUser: (req: Request, res: Response) => void;
  getTask: (req: Request, res: Response) => void;
  updateTask: (req: Request, res: Response) => void;
  deleteTask: (req: Request, res: Response) => void;
}

export default (logger: Logger, dbClient: DBClient): TaskController => {
  const validator = getValidator(logger, dbClient);
  const errorHandler = getErrorHandler(logger);

  return {
    createTask: async (req, res) => {
      logger.info('Task Controller: createTask');
      const { status, name, description } = req.body;
      const userId = req.user.id;

      try {
        const validatorResult = validator.validateCreateTask(status);
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        logger.info('Creating task');
        const result = await dbClient.createTask(userId, status, name, description);
        const taskId = result.rows[0].id;
        res.status(201).send({ taskId });
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },

    getAllTasksFromUser: async (req, res) => {
      logger.info('Task Controller: getAllTasksFromUser');
      const ownerId = req.user.id;

      try {
        const result = await dbClient.getAllTasksFromUser(ownerId);
        const tasks = result.rows;
        res.status(200).send({ tasks });
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },

    getTask: async (req, res) => {
      logger.info('Task Controller: getTask');
      const { taskId } = req.params;
      const userId = req.user.id;

      try {
        const validatorResult = await validator.validateGetTask(userId, Number(taskId));
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        const result = await dbClient.getTask(Number(taskId));
        const task = result.rows[0];
        res.status(200).send({ task });
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },

    updateTask: async (req, res) => {
      logger.info('Task Controller: updateTask');
      const { status, name, description } = req.body;
      const { taskId } = req.params;
      const userId = req.user.id;

      try {
        const validatorResult = await validator.validateUpdateTask(userId, Number(taskId), status);
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        await dbClient.updateTask(Number(taskId), status, name, description);
        res.status(200).send();
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },

    deleteTask: async (req, res) => {
      logger.info('Task Controller: deleteTask');
      const { taskId } = req.params;
      const userId = req.user.id;

      try {
        const validatorResult = await validator.validateDeleteTask(userId, Number(taskId));
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        await dbClient.deleteTask(Number(taskId));
        res.status(200).send();
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },
  };
};
