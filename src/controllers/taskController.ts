import { Logger } from 'winston';
import { Request, Response } from 'express';
import { DBClient } from '../db/dbClient';

export interface TaskController {
  addTask: (req: Request, res: Response) => void;
}

export default (logger: Logger, dbClient: DBClient): TaskController => ({
  addTask: async (req, res) => {
    logger.info('Adding task!');
    await dbClient.addTask();
    logger.info('Task added!');
    res.send('Task added!');
  },
});
