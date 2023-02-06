import { Request, Response, Router } from 'express';
import { User } from '../model';

export const usersRouter = Router();
// Create user
usersRouter.post('/', async (req: Request, res: Response) => {
    try {
      const newUser = await User.create(req.body);
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  });
// Get all users
usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting users');
  }
});

// Get a single user by ID
usersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting user');
  }
});

// Update a user by ID
usersRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const [affectedCount, affectedRows] = await User.update(req.body
    , {
      where: { id: req.params.id },
      returning: true,
    });
    if (affectedCount === 0) {
      res.status(404).send('User not found');
    } else {
      res.json(affectedRows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

// Delete a user by ID
usersRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const affectedCount = await User.destroy({ where: { id: req.params.id } });
if (affectedCount > 0) {
res.status(204).send();
} else {
res.status(404).send();
}
} catch (error) {
res.status(500).send(error);
}
});

export default usersRouter;