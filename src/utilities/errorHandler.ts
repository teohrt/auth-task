import { Logger } from 'winston';
import { Response } from 'express';

export interface IServerError {
  serverError: (res: Response, err: Error) => void
}

export default (logger: Logger): IServerError => ({
  serverError: (res, err) => {
    const errMsg = 'Server error';
    logger.error(errMsg);
    res.status(500).send({ errMsg });
  },
});
