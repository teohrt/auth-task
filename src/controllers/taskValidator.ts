/* eslint-disable max-len */
import { Logger } from 'winston';
import { DBClient } from '../db/dbClient';

interface IValidationResponse {
  isValid: boolean
  responseCode: number
  msg: string
}

interface ITaskValidator {
  v1ValidateCreateTask: (status: string) => IValidationResponse
  v2ValidateCreateTask: (status: string) => IValidationResponse
  validateGetTask: (userId: number, taskId: number) => Promise<IValidationResponse>
  v1ValidateUpdateTask: (userId: number, taskId: number, status: string) => Promise<IValidationResponse>
  v2ValidateUpdateTask: (userId: number, taskId: number, status: string) => Promise<IValidationResponse>
  validateDeleteTask: (userId: number, taskId: number) => Promise<IValidationResponse>
}

const v1Statuses = ['New', 'Completed'];
const v2Statuses = [...v1Statuses, 'In Progress'];

export default (logger: Logger, dbClient: DBClient): ITaskValidator => {
  const v1CheckStatusInput = (status: string): IValidationResponse => {
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

  const v2CheckStatusInput = (status: string): IValidationResponse => {
    // Check to see if status value is in list of acceptable values
    logger.info(`Validating status input: ${status}`);
    if (!v2Statuses.includes(status)) {
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

  const checkIfTaskExistsAndBelongsToUser = async (userId: number, taskId: number): Promise<IValidationResponse> => {
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
    v1ValidateCreateTask: (status) => v1CheckStatusInput(status),

    v2ValidateCreateTask: (status) => v2CheckStatusInput(status),

    validateGetTask: (userId, taskId) => checkIfTaskExistsAndBelongsToUser(userId, taskId),

    v1ValidateUpdateTask: async (userId, taskId, status) => {
      const statusResult = v1CheckStatusInput(status);
      if (!statusResult.isValid) { return statusResult; }
      return checkIfTaskExistsAndBelongsToUser(userId, taskId);
    },

    v2ValidateUpdateTask: async (userId, taskId, status) => {
      const statusResult = v2CheckStatusInput(status);
      if (!statusResult.isValid) { return statusResult; }
      return checkIfTaskExistsAndBelongsToUser(userId, taskId);
    },

    validateDeleteTask: (userId, taskId) => checkIfTaskExistsAndBelongsToUser(userId, taskId),
  };
};
