import express from 'express';
import { sequelize } from './app/model/index';
import { usersRouter } from './app/controllers/user.controller';
import { Router } from 'express';
import { contractorsRouter } from '../src/app/controllers/contractor.controller';
import { proformsRouter } from './app/controllers/proform.controller';
import { invoicesRouter } from '../src/app/controllers/invoices.controller';
import { settingsRouter } from './app/controllers/settings.controller';
import loginRouter from './app/controllers/login.controller';
import cors from 'cors';
import { currenciesRouter } from './app/controllers/currencies.controller';
import { paymentMethodsRouter } from './app/controllers/payment-method.controller';
import verifyUser from './app/auth/verify-user';
import logoutRouter from './app/controllers/logout.controller';
import pingRouter from './app/controllers/ping.controller';
import cookieParser from 'cookie-parser';
import * as path from 'path';

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
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: 'http://localhost:4200' })); // allow access from client and allow to set cookie
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/api/v1', apiRouter);
  apiRouter.use('/users', verifyUser, usersRouter);
  apiRouter.use('/contractors', verifyUser, contractorsRouter);
  apiRouter.use('/proforms', verifyUser, proformsRouter);
  apiRouter.use('/invoices', verifyUser, invoicesRouter);
  apiRouter.use('/currencies', verifyUser, currenciesRouter);
  apiRouter.use('/paymentMethods', verifyUser, paymentMethodsRouter);
  apiRouter.use('/settings', verifyUser, settingsRouter);
  apiRouter.use('/login', loginRouter);
  apiRouter.use('/logout', logoutRouter);
  apiRouter.use('/ping', verifyUser, pingRouter);

  app.use(
    '/assets',
    express.static(
      path.join(__dirname, '..', '..', 'frontend', 'dist', 'frontend', 'assets')
    )
  );

  app.use(
    '/',
    express.static(
      path.join(__dirname, '..', '..', 'frontend', 'dist', 'website-admin')
    )
  );
  app.use(
    '/*',
    express.static(
      path.join(__dirname, '..', '..', 'frontend', 'dist', 'website-admin')
    )
  );

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
