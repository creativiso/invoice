import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUserById,
  getUserByUsername,
} from '../services/user.service';

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
  const id = req.params.id;
  await deleteUserById(id, res);
});
//-----------------------------------login-------------------------------------------
// Login user
usersRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send('Invalid username or password');
    }

    // Generate JWT token and send it back to client
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

export default usersRouter;
