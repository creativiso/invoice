import { Request, Response, Router } from 'express';
import { User } from '../model';
import { createUser,getUserById,getAllUsers,updateUser ,deleteUserById} from '../services/user.service';

export const usersRouter = Router();
// Create user
usersRouter.post('/', async (req: Request, res: Response) => {
    try {
      const newUser = await createUser(req.body);
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  });
// Get all users
usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting users');
  }
});

// Get a single user by ID
usersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Update a user by ID
usersRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedUser = await updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

// Delete a user by ID
usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  await deleteUserById(id, res);
});

export default usersRouter;