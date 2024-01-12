import { Router } from 'express';
import { ContractorService } from '../services/contractor.service';

export const contractorsRouter = Router();
const contractorService = new ContractorService();
contractorsRouter.get('/', async (req, res) => {
  const contractors = await contractorService.getAllContractors();
  res.json(contractors);
});

contractorsRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const contractor = await contractorService.getContractorById(id);
    res.json(contractor);
  } catch (error) {
    res.status(404).json({ error: 'Contractor not found' });
  }
});
//create
contractorsRouter.post('/add', async (req, res) => {
  const { name, city, address, eik, dds, ddsnumber, mol, person, egn } =
    req.body;
  const contractor = await contractorService.createContractor(
    name,
    city,
    address,
    eik,
    dds,
    ddsnumber,
    mol,
    person,
    egn
  );
  res.json(contractor);
});
//update
contractorsRouter.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, city, address, eik, dds, ddsnumber, mol, person, egn } =
      req.body;
    const contractor = await contractorService.updateContractor(
      id,
      name,
      city,
      address,
      eik,
      dds,
      ddsnumber,
      mol,
      person,
      egn
    );
    res.json(contractor);
  } catch (error) {
    res.status(404).json({ error: 'Contractor not found' });
  }
});
//delete
contractorsRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await contractorService.deleteContractor(id);
    res.json({ message: 'Contractor deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Contractor not found' });
  }
});
