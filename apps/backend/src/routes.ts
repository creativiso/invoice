import express, { Router } from 'express';
import { Contractor } from './app/model/index';
export const apiRouter = Router();

apiRouter.get('/contractors', async (req, res) => {
  const contractors = await Contractor.findAll();
  res.json(contractors);
});

apiRouter.get('/contractors/:id', async (req, res) => {
  const contractor = await Contractor.findByPk(req.params.id);
  if (!contractor) {
    return res.status(404).json({ error: 'Contractor not found' });
  }
  res.json(contractor);
});

apiRouter.post('/contractors', async (req, res) => {
  const { name, city, address, eik, dds, ddsnumber, mol, person, egn } =
    req.body;
  const contractor = await Contractor.create({
    name,
    city,
    address,
    eik,
    dds,
    ddsnumber,
    mol,
    person,
    egn,
  });
  res.json(contractor);
});

apiRouter.put('/contractors/:id', async (req, res) => {
  const contractor = await Contractor.findByPk(req.params.id);
  if (!contractor) {
    return res.status(404).json({ error: 'Contractor not found' });
  }
  const { name, city, address, eik, dds, ddsnumber, mol, person, egn } =
    req.body;
  await contractor.update({
    name,
    city,
    address,
    eik,
    dds,
    ddsnumber,
    mol,
    person,
    egn,
  });
  res.json(contractor);
});

apiRouter.delete('/contractors/:id', async (req, res) => {
  const contractor = await Contractor.findByPk(req.params.id);
  if (!contractor) {
    return res.status(404).json({ error: 'Contractor not found' });
  }
  await contractor.destroy();
  res.json({ message: 'Contractor deleted' });
});

const app = express();
app.use(express.json());
app.use('/api/v1', apiRouter);
const port = process.env.port || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
