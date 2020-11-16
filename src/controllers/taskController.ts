/* eslint-disable max-len */
import { Logger } from 'winston';
import { Request, Response, NextFunction } from 'express';
import { DBClient } from '../db/dbClient';
import getValidator from './taskValidator';
import getErrorHandler from '../utilities/errorHandler';

interface ITaskController {
  v1CreateTask: (req: Request, res: Response) => void;
  v2CreateTask: (req: Request, res: Response) => void;
  getAllTasksFromUser: (req: Request, res: Response) => void;
  getTask: (req: Request, res: Response) => void;
  v1UpdateTask: (req: Request, res: Response) => void;
  v2UpdateTask: (req: Request, res: Response) => void;
  deleteTask: (req: Request, res: Response) => void;
}

export default (logger: Logger, dbClient: DBClient): ITaskController => {
  const validator = getValidator(logger, dbClient);
  const errorHandler = getErrorHandler(logger);

  return {
    v1CreateTask: async (req, res) => {
      logger.info('Task Controller: v1CreateTask');
      const {
        name, description, dueDate,
      } = req.body;
      const userId = req.user.id;

      // If status isn't specified, default to 'New'
      let { status } = req.body;
      if (status === undefined || status === '') { status = 'New'; }

      try {
        const validatorResult = validator.v1ValidateCreateTask(status);
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        logger.info('Creating task');
        const result = await dbClient.createTask(userId, status, name, description, dueDate);
        const taskId = result.rows[0].id;
        res.status(201).send({ taskId });
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },

    v2CreateTask: async (req, res) => {
      logger.info('Task Controller: v2CreateTask');
      const {
        name, description, dueDate,
      } = req.body;
      const userId = req.user.id;

      // If status isn't specified, default to 'New'
      let { status } = req.body;
      if (status === undefined || status === '') { status = 'New'; }

      try {
        const validatorResult = validator.v2ValidateCreateTask(status);
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        logger.info('Creating task');
        const result = await dbClient.createTask(userId, status, name, description, dueDate);
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

    v1UpdateTask: async (req, res) => {
      logger.info('Task Controller: v1UpdateTask');
      const {
        status, name, description, dueDate,
      } = req.body;
      const { taskId } = req.params;
      const userId = req.user.id;

      try {
        const validatorResult = await validator.v1ValidateUpdateTask(userId, Number(taskId), status);
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        await dbClient.updateTask(Number(taskId), status, name, description, dueDate);
        res.status(200).send();
      } catch (err) {
        errorHandler.serverError(res, err);
      }
    },

    v2UpdateTask: async (req, res) => {
      logger.info('Task Controller: v2UpdateTask');
      const {
        status, name, description, dueDate,
      } = req.body;
      const { taskId } = req.params;
      const userId = req.user.id;

      try {
        const validatorResult = await validator.v2ValidateUpdateTask(userId, Number(taskId), status);
        if (!validatorResult.isValid) {
          res.status(validatorResult.responseCode).send({ validationError: validatorResult.msg });
          return;
        }
      } catch (err) {
        errorHandler.serverError(res, err);
      }

      try {
        await dbClient.updateTask(Number(taskId), status, name, description, dueDate);
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
