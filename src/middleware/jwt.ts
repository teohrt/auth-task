import jwt from 'express-jwt';
import { Logger } from 'winston';
import { Request, Response } from 'express';

interface jwtMiddleware {
  jwtValidation: jwt.RequestHandler,
  unauthorizedErrorHandling: (err: any, req: Request, res: Response, next: any) => void
}

export default (logger: Logger): jwtMiddleware => ({
  jwtValidation: jwt({
    secret: String(process.env.ACCESS_TOKEN_SECRET),
    algorithms: ['HS256'],
  }),

  unauthorizedErrorHandling: (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send({ message: err.message });
      logger.error(err);
      return;
    }
    next();
  },
});
