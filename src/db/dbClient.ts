import { Client } from 'pg';
import { Logger } from 'winston';

interface DBClient {
  addTask: () => Promise<unknown>;
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

  const dbQuery = async (queryString: string) => {
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
      return null;
    }
  };

  return {
    addTask: () => dbQuery(`
    INSERT INTO task(status, name, description)
    VALUES ('test', 'trace', 'hello world');
    `),
  };
};
