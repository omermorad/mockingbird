import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { applicationFactory } from './app';
import { connectionFactory } from './common/connection-factory';

(async () => {
  const connection = (await connectionFactory().catch((error) => {
    console.error('Error connection to database', error);
  })) as Connection;

  const app = await applicationFactory(connection);

  app.listen(3000, () => console.info('Application started at port 3000'));
})();
