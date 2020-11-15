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

export default (logger: Logger, dbClient: DBClient): TaskController => ({
  createTask: async (req, res) => {
    logger.info('Task Controller: Creating task');
    const { status, name, description } = req.body;
    const ownerId = req.user.id;
    // TODO: Additional validation required: Check ownerId and status values
    // TODO: Statuses can only be "New" and "Copmleted"
    const result = await dbClient.createTask(ownerId, status, name, description);
    const newId = result.rows[0].id;
    res.status(201).send({ taskId: newId });
  },

  getAllTasksFromUser: async (req, res) => {
    logger.info('Task Controller: Get All Tasks From User');
    const ownerId = req.user.id;
    // TODO: Additional validation required: Check ownerId
    const result = await dbClient.getAllTasksFromUser(ownerId);
    const taskArray = result.rows;
    res.status(200).send({ tasks: taskArray });
  },

  getTask: async (req, res) => {
    logger.info('Task Controller: Get Task');
    const { taskId } = req.params;
    // TODO: Additional validation required: Check that task belongs to user
    const result = await dbClient.getTask(Number(taskId));
    const task = result.rows[0];
    res.status(200).send({ task });
  },

  updateTask: async (req, res) => {
    logger.info('Task Controller: Update Task');
    const { status, name, description } = req.body;
    const { taskId } = req.params;
    // TODO: Additional validation required: Check that task belongs to user
    // TODO: Makes sure status value is acceptable
    // TODO: Check if record exists
    await dbClient.updateTask(Number(taskId), status, name, description);
    res.status(200).send();
  },

  deleteTask: async (req, res) => {
    logger.info('Task Controller: Delete Task');
    const { taskId } = req.params;
    // TODOL Check if record exists
    // TODO: Additional validation required: Check that task belongs to user
    await dbClient.deleteTask(Number(taskId));
    res.status(200).send();
  },
});
