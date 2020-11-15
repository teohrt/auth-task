import { Logger } from 'winston';
import { Request, Response } from 'express';
import { DBClient } from '../db/dbClient';

export interface TaskController {
  createTask: (req: Request, res: Response) => void;
  getAllTasksFromUser: (req: Request, res: Response) => void;
  getTask: (req: Request, res: Response) => void;
  updateTask: (req: Request, res: Response) => void;
  deleteTask: (req: Request, res: Response) => void;
}

const v1Statuses = ['New', 'Completed'];

export default (logger: Logger, dbClient: DBClient): TaskController => ({
  createTask: async (req, res) => {
    logger.info('Task Controller: createTask');
    const { status, name, description } = req.body;
    const userId = req.user.id;

    // Validate status input
    if (!v1Statuses.includes(status)) {
      logger.info(`User ${userId} input bad status value: ${status}`);
      res.status(400).send({ inputError: 'Status may only be \'New\' or \'Completed\'' });
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

    const result = await dbClient.getTask(Number(taskId));
    const task = result.rows[0];

    // Check if task belongs to user
    const taskOwnerId = task.owner_id;
    if (taskOwnerId === userId) {
      res.status(200).send({ task });
    } else {
      res.status(403).send({ forbiddenError: 'Unable to retrieve task - Differing task owner' });
    }
  },

  updateTask: async (req, res) => {
    logger.info('Task Controller: updateTask');
    const { status, name, description } = req.body;
    const { taskId } = req.params;
    const userId = req.user.id;

    // Validate status input
    if (!v1Statuses.includes(status)) {
      logger.info(`User ${userId} input bad status value: ${status}`);
      res.status(400).send({ inputError: 'Unable to update task - Status may only be \'New\' or \'Completed\'.' });
      return;
    }

    // Check if task exists
    const result = await dbClient.getTask(Number(taskId));
    if (result.rowCount < 1) {
      logger.info(`User ${userId} requested a non existant task id: ${taskId}`);
      res.status(404).send({ resourceNotFound: 'Unable to update task - Task not found' });
      return;
    }

    // Check ownership
    const task = result.rows[0];
    const taskOwnerId = task.owner_id;
    if (taskOwnerId !== userId) {
      res.status(403).send({ forbiddenError: 'Unable to update task - Differing task owner' });
      return;
    }

    await dbClient.updateTask(Number(taskId), status, name, description);
    res.status(200).send();
  },

  deleteTask: async (req, res) => {
    logger.info('Task Controller: deleteTask');
    const { taskId } = req.params;
    const userId = req.user.id;

    // Check if task exists
    const result = await dbClient.getTask(Number(taskId));
    if (result.rowCount < 1) {
      logger.info(`User ${userId} requested a non existant task id: ${taskId}`);
      res.status(404).send({ resourceNotFound: 'Unable to delete task - Task not found' });
      return;
    }

    // Check ownership
    const task = result.rows[0];
    const taskOwnerId = task.owner_id;
    if (taskOwnerId !== userId) {
      res.status(403).send({ forbiddenError: 'Unable to delete task - Differing task owner' });
      return;
    }

    await dbClient.deleteTask(Number(taskId));
    res.status(200).send();
  },
});
