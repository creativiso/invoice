import express, { Router } from 'express';
import { sequelize } from './app/model/index';
import { usersRouter } from './app/contollers/user.controller'
(async () => {
  try {
    await sequelize.sync();
    console.log('Database has been initialized.');
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
  const app = express();
  const apiRouter = Router();
  app.use(express.json());
  app.use('/api/v1', apiRouter);
  apiRouter.use('/users', usersRouter);
  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
})();

