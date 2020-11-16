/* eslint-disable max-len */
import { Logger } from 'winston';
import { DBClient } from '../db/dbClient';

export interface ValidationResponse {
  isValid: boolean
  responseCode: number
  msg: string
}

export interface TaskValidator {
  validateCreateTask: (status: string) => ValidationResponse
  validateGetTask: (userId: number, taskId: number) => Promise<ValidationResponse>
  validateUpdateTask: (userId: number, taskId: number, status: string) => Promise<ValidationResponse>
  validateDeleteTask: (userId: number, taskId: number) => Promise<ValidationResponse>
}

const v1Statuses = ['New', 'Completed'];

export default (logger: Logger, dbClient: DBClient): TaskValidator => {
  const checkStatusInput = (status: string): ValidationResponse => {
    // Check to see if status value is in list of acceptable values
    logger.info(`Validating status input: ${status}`);
    if (!v1Statuses.includes(status)) {
      const msg = 'Status may only be \'New\' or \'Completed\'';
      logger.info(`Validation failed: ${msg}`);
      return {
        isValid: false,
        responseCode: 400,
        msg,
      };
    }
    return {
      isValid: true,
      responseCode: -1,
      msg: '',
    };
  };

  const checkIfTaskExistsAndBelongsToUser = async (userId: number, taskId: number): Promise<ValidationResponse> => {
    // Check if task exists
    logger.info(`Verifying that taskId-${taskId} exists`);
    const result = await dbClient.getTask(Number(taskId));
    if (result.rowCount < 1) {
      const msg = 'Task not found';
      logger.info(`Validation failed: ${msg}`);
      return {
        isValid: false,
        responseCode: 404,
        msg,
      };
    }

    // Check ownership
    logger.info(`Verifying that taskId-${taskId} is owned by userId-${userId}`);
    const task = result.rows[0];
    const taskOwnerId = task.owner_id;
    if (taskOwnerId !== userId) {
      const msg = 'Differing task owner';
      logger.info(`Validation failed: ${msg}`);
      return {
        isValid: false,
        responseCode: 403,
        msg,
      };
    }
    return {
      isValid: true,
      responseCode: -1,
      msg: '',
    };
  };

  return {
    validateCreateTask: (status) => checkStatusInput(status),

    validateGetTask: (userId, taskId) => checkIfTaskExistsAndBelongsToUser(userId, taskId),

    validateUpdateTask: async (userId, taskId, status) => {
      const statusResult = checkStatusInput(status);
      if (!statusResult.isValid) { return statusResult; }
      return checkIfTaskExistsAndBelongsToUser(userId, taskId);
    },

    validateDeleteTask: (userId, taskId) => checkIfTaskExistsAndBelongsToUser(userId, taskId),
  };
};
