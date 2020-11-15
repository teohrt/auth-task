import { Client, QueryResult } from 'pg';
import { Logger } from 'winston';

export interface DBClient {
  addTask: () => Promise<QueryResult>;
  createUser: (username: string, passwordHash: string, salt: string) => Promise<QueryResult>;
  getUserByName: (username: string) => Promise<QueryResult>;
}

export default (logger: Logger): DBClient => {
  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });

  client.connect((err: Error) => {
    if (err) {
      logger.error(`DB connection error: ${err.stack}`);
    } else {
      logger.info('DB connected');
    }
  });

  client.on('error', (err: Error) => {
    logger.error(`Error with DB: ${err.stack}`);
  });

  const dbQuery = async (queryString: string): Promise<QueryResult> => {
    try {
      logger.debug(`Query: ${queryString}`);
      return await new Promise((resolve, reject) => {
        client.query(queryString, (err: Error, res) => {
          if (err) {
            reject(err.stack);
          }
          resolve(res);
        });
      });
    } catch (err) {
      logger.error(err);
      return null as any;
    }
  };

  return {
    addTask: async () => dbQuery(`
    INSERT INTO task(owner_id, status, name, description)
    VALUES (1, 'test', 'trace', 'hello world');
    `),

    createUser: async (username, passwordHash, salt) => dbQuery(`
    INSERT INTO app_user(username, password_hash, salt)
    VALUES ('${username}', '${passwordHash}', '${salt}');
    `),

    getUserByName: async (username) => dbQuery(`
    SELECT * FROM app_user
    WHERE username = '${username}';
    `),
  };
};
