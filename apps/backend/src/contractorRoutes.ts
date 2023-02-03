import { Router } from 'express';
import { Contractor } from './app/model/models/Contractor';
export const contractorsRouter = Router();

contractorsRouter.get('/', async (req, res) => {
  const contractors = await Contractor.findAll();
  res.json(contractors);
});

contractorsRouter.get('/:id', async (req, res) => {
  const contractor = await Contractor.findByPk(req.params.id);
  if (!contractor) {
    return res.status(404).json({ error: 'Contractor not found' });
  }
  res.json(contractor);
});

contractorsRouter.post('/', async (req, res) => {
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

contractorsRouter.put('/:id', async (req, res) => {
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

contractorsRouter.delete('/:id', async (req, res) => {
  const contractor = await Contractor.findByPk(req.params.id);
  if (!contractor) {
    return res.status(404).json({ error: 'Contractor not found' });
  }
  await contractor.destroy();
  res.json({ message: 'Contractor deleted' });
});
