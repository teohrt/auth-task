/* eslint-disable max-len */
import { Client, QueryResult } from 'pg';
import { Logger } from 'winston';

export interface DBClient {
  createUser: (username: string, passwordHash: string, salt: string) => Promise<QueryResult>;
  getUserByName: (username: string) => Promise<QueryResult>;
  createTask: (ownerId: number, status: string, name: string, description: string) => Promise<QueryResult>;
  getAllTasksFromUser: (id: number) => Promise<QueryResult>;
  getTask: (taskId: number) => Promise<QueryResult>;
  updateTask: (taskId: number, status: string, name: string, description: string) => Promise<QueryResult>;
  deleteTask: (taskId: number) => Promise<QueryResult>;
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
    createUser: async (username, passwordHash, salt) => dbQuery(`
    INSERT INTO app_user(username, password_hash, salt)
    VALUES ('${username}', '${passwordHash}', '${salt}')
    RETURNING id;
    `),

    getUserByName: async (username) => dbQuery(`
    SELECT * FROM app_user
    WHERE username = '${username}';
    `),

    createTask: async (ownerId, status, name, description) => dbQuery(`
    INSERT INTO task(owner_id, status, name, description)
    VALUES (${ownerId}, '${status}', '${name}', '${description}')
    RETURNING id;
    `),

    getAllTasksFromUser: async (ownerId) => dbQuery(`
    SELECT * FROM task
    WHERE owner_id = ${ownerId};
    `),

    getTask: async (taskId) => dbQuery(`
    SELECT * FROM task
    WHERE id = ${taskId};
    `),

    updateTask: async (taskId, status, name, description) => dbQuery(`
    UPDATE task
    SET   status = '${status}',
          name = '${name}',
          description = '${description}'
    WHERE id = ${taskId};
    `),

    deleteTask: async (taskId) => dbQuery(`
    DELETE FROM task
    WHERE id = ${taskId};
    `),
  };
};
