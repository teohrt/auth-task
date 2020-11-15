import { Router } from 'express';
import { Logger } from 'winston';
import { DBClient } from '../../db/dbClient';
import getV1Routes from './v1';
import getV2Routes from './v2';

export default (logger: Logger, dbClient: DBClient): Router => {
  const v1Routes = getV1Routes(logger, dbClient);
  const v2Routes = getV2Routes(logger, dbClient);

  const router = Router();
  router.use('/v1', v1Routes);
  router.use('/v2', v2Routes);

  return router;
};
