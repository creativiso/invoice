import { Request, Response, Router } from 'express';
import {
  createProform,
  getAllProforms,
  getProformById,
  updateProform,
} from '../services/proform.service';

export const proformRouter = Router();

// Create
proformRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await createProform(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating proform');
  }
});
// Get all
proformRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getAllProforms();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting proforms');
  }
});

// Get a single by ID
proformRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await getProformById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Update  by ID
proformRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedUser = await updateProform(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating proform');
  }
});

export default proformRouter;
