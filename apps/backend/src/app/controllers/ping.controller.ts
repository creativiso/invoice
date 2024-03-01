import { Request, Response, Router } from 'express';

const pingRouter = Router();

pingRouter.get('/', async (req: Request, res: Response) => {
  // Empty request that checks if the cookie token is valid
  // Sent on initial load
  // @ts-ignore (for the req.user to not throw error)
  const user = req.user;
  if (user) {
    res.send(true); // isLoggedIn
  } else res.send(false);
});

export default pingRouter;
