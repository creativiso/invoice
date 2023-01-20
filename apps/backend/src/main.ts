
import express, { Router } from 'express';
import { DbInit } from './models';
import { models } from './models';

const app = express();
const apiRouter = Router();
app.use('/api/v1', apiRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

DbInit();

