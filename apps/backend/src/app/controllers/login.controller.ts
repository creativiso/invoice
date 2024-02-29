import { Request, Response, Router } from 'express';
import { LoginService } from '../services/login.service';

const loginRouter = Router();
const loginService = new LoginService();

loginRouter.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await loginService.login(username, password);

  res.cookie('token', token, { httpOnly: true });
  res.send(true); // login confirmation
});

export default loginRouter;
