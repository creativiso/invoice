import express from 'express';
import { sequelize } from './app/model/index';
import { usersRouter } from './app/controllers/user.controller';
import { Router } from 'express';
import { contractorsRouter } from '../src/app/controllers/contractor.controller';
import { proformsRouter } from './app/controllers/proform.controller';
import loginRouter from './app/controllers/login.controller';
import cors from 'cors';

export const apiRouter = Router();

(async () => {
  try {
    await sequelize.sync();
    console.log('Database has been initialized.');
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
  const app = express();
  app.use(express.json());
  app.use(cors());
  const apiRouter = Router();
  app.use('/api/v1', apiRouter);
  apiRouter.use('/users', usersRouter);
  apiRouter.use('/contractors', contractorsRouter);
  apiRouter.use('/proforms', proformsRouter);
  apiRouter.use('/login', loginRouter);

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
