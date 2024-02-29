import { Request, Response, Router } from 'express';

const logoutRouter = Router();

logoutRouter.get('/', async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.send(false); // loginConfirmation
});

export default logoutRouter;
