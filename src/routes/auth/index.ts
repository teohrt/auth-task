import { Router } from 'express';
import { Logger } from 'winston';
import { DBClient } from '../../db/dbClient';
import getAuthController from '../../controllers/authController';

export default (logger: Logger, dbClient: DBClient): Router => {
  const authController = getAuthController(logger, dbClient);

  const router = Router();
  router.post('/register', authController.register);
  router.post('/login', authController.login);

  return router;
};
