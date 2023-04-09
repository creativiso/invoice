import { Request, Response, Router } from 'express';
import { User } from '../model/models/User';
import { sign } from 'jsonwebtoken';

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.comparePassword(username, password);
  if (!user) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  const token = sign({ userId: user.id }, 'your-secret-key');
  res.json({ token });
});

export default loginRouter;
