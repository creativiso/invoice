import express from 'express';
import { sequelize } from './app/model/index';
import { apiRouter } from './routes';

(async () => {
  try {
    await sequelize.sync();
    console.log('Database has been initialized.');
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
  const app = express();
  //const apiRouter = Router();
  app.use('/api/v1', apiRouter);
  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
