import express from 'express';
import { sequelize } from './app/model/index';
import { usersRouter } from './app/controllers/user.controller';
import { Router } from 'express';
import { contractorsRouter } from '../src/app/controllers/contractor.controller';
import { proformsRouter } from './app/controllers/proform.controller';
import { getUserByUsername } from './app/services/user.service';
import generateToken from './app/services/user.service';
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
  const apiRouter = Router();
  app.use('/api/v1', apiRouter);
  apiRouter.use('/users', usersRouter);
  app.use('/api/v1/contractors', contractorsRouter);
  apiRouter.use('/proforms', proformsRouter);
  apiRouter.use('/login', usersRouter);
  apiRouter.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(user);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
