import { Logger } from 'winston';
import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { DBClient } from '../db/dbClient';

export interface AuthController {
  register: (req: Request, res: Response) => void;
  login: (req: Request, res: Response) => void;
}

interface saltHash {
  salt: string,
  hash: string
}

// Hashes the password with the salt and returns the pair
const hashPassword = (password: string, saltValue: string): saltHash => {
  const hash = crypto.createHmac('sha512', saltValue);
  hash.update(password);
  const hashValue = hash.digest('hex');
  return {
    salt: saltValue,
    hash: hashValue,
  };
};

// Generates and returns a random salt value of a particular length
const generateSalt = (length: number): string => crypto.randomBytes(length).toString('hex').slice(0, length);

// Generates a random salt, hashes the input password with it, and returns the pair
const saltHashPassword = (password: string): saltHash => {
  const saltValue = generateSalt(16);
  return hashPassword(password, saltValue);
};

export default (logger: Logger, dbClient: DBClient): AuthController => ({
  register: async (req, res) => {
    try {
      logger.info('AuthController: Attempting registration');
      const { username, password } = req.body;

      // Verify unique username
      const userResponse = await dbClient.getUserByName(username);
      if (userResponse.rowCount < 1) {
        logger.info(`Username '${username}' is available`);
      } else {
        const msg = `Username '${username}' is not available`;
        logger.info(msg);
        res.send(msg);
        return;
      }

      // If unique, create user
      const { salt, hash } = saltHashPassword(password);
      await dbClient.createUser(username, hash, salt);
      res.send('User Registered!');
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  },

  login: async (req, res) => {
    try {
      logger.info('AuthController: Attempting login');
      const { username, password } = req.body;

      // Retrieve user data
      const userResponse = await dbClient.getUserByName(username);
      if (userResponse.rowCount < 1) {
        const msg = 'Incorrect username or password';
        logger.info(msg);
        res.send(msg);
      } else {
        // Verify password
        const user = userResponse.rows[0];
        const storedHash = user.password_hash;
        const storedSalt = user.salt;
        const storedId = user.id;

        const { hash } = hashPassword(password, storedSalt);

        const loginSuccessful = hash === storedHash;
        if (loginSuccessful) {
          logger.info('Login successful');

          const accessToken = jwt.sign({
            user: username,
            id: storedId,
          }, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: '1h',
          });

          res.json({
            accessToken,
          });
        } else {
          const msg = 'Incorrect username or password';
          logger.info(msg);
          res.send(msg);
        }
      }
    } catch (err) {
      logger.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  },
});
