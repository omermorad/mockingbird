import 'reflect-metadata';
import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import { Connection } from 'typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';

export async function applicationFactory(connection: Connection): Promise<Application> {
  const app: Application = express();

  app.use(bodyParser.json());
  app.use('/api', UserController(Router(), connection.getRepository(UserEntity)));

  return app;
}
