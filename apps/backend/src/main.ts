import express from 'express';
import { sequelize } from './app/model/index';
import { Router } from 'express';
import { contractorsRouter } from '../src/app/controllers/contractor.controller';
export const apiRouter = Router();
(async () => {
  try {
    await sequelize.sync();
    console.log('Database has been initialized.');
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
  const app = express();
  app.use('/api/v1', apiRouter);
  app.use('/api/v1/contractors', contractorsRouter);
  //app.use(apiRouter,'/contractors', contractorsRouter);
  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
