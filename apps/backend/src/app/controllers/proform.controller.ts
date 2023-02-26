import { Router } from 'express';
import { ProformService } from '../services/proform.service';

export const proformsRouter = Router();
const proformService = new ProformService();

//read all proforms
proformsRouter.get('/', async (req, res) => {
  const proforms = await proformService.getAllProforms();
  res.json(proforms);
});

//read by id proforms and proformitems
proformsRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const proform = await proformService.getProformById(id);
    const proformItems = await proformService.getProformItemsById(id);
    res.json({ proform, proformItems });
  } catch (error) {
    res.status(404).json({ error: 'Proform not found' });
  }
});

//read all proform items for a particular proform
proformsRouter.get('/:id/items', async (req, res) => {
  try {
    const proformId = Number(req.params.id);
    const proformItems = await proformService.getProformItemsById(proformId);
    res.json(proformItems);
  } catch (error) {
    res.status(404).json({ error: 'Proform not found' });
  }
});

// create proform
proformsRouter.post('/add', async (req, res) => {
  try {
    const proform = await proformService.createProform(
      req.body.contractor,
      req.body.issue_date,
      req.body.bank_payment,
      req.body.vat,
      req.body.novatreason,
      req.body.currency,
      req.body.rate,
      req.body.c_name,
      req.body.c_city,
      req.body.c_address,
      req.body.c_eik,
      req.body.c_ddsnumber,
      req.body.c_mol,
      req.body.c_person,
      req.body.c_egn,
      req.body.p_name,
      req.body.p_city,
      req.body.p_address,
      req.body.p_eik,
      req.body.p_ddsnumber,
      req.body.p_mol,
      req.body.p_bank,
      req.body.p_iban,
      req.body.p_bic,
      req.body.p_zdds,
      req.body.author,
      req.body.author_user,
      req.body.author_sign
    );
    res.json(proform);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// create proform item
proformsRouter.post('/:id/items', async (req, res) => {
  try {
    const proformItem = await proformService.createProformItems(
      req.body.proform,
      req.body.name,
      req.body.quantity,
      req.body.measurement,
      req.body.price
    );
    res.json(proformItem);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message + 'Canot create proformitems' });
  }
});

//update Proform
proformsRouter.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      contractor,
      issue_date,
      bank_payment,
      vat,
      novatreason,
      currency,
      rate,
      c_name,
      c_city,
      c_address,
      c_eik,
      c_ddsnumber,
      c_mol,
      c_person,
      c_egn,
      p_name,
      p_city,
      p_address,
      p_eik,
      p_ddsnumber,
      p_mol,
      p_bank,
      p_iban,
      p_bic,
      p_zdds,
      author,
      author_user,
      author_sign,
    } = req.body;
    const proform = await proformService.updateProform(
      id,
      contractor,
      issue_date,
      bank_payment,
      vat,
      novatreason,
      currency,
      rate,
      c_name,
      c_city,
      c_address,
      c_eik,
      c_ddsnumber,
      c_mol,
      c_person,
      c_egn,
      p_name,
      p_city,
      p_address,
      p_eik,
      p_ddsnumber,
      p_mol,
      p_bank,
      p_iban,
      p_bic,
      p_zdds,
      author,
      author_user,
      author_sign
    );
    res.json(proform);
  } catch (error) {
    res.status(404).json({ error: 'error updating Proform ' });
  }
});
//update proform items
proformsRouter.put('/:proform/items/:id', async (req, res) => {
  try {
    const { proform, id } = req.params;
    const { name, quantity, measurement, price } = req.body;
    const updatedItem = await proformService.updateProformItems(
      Number(id),
      Number(proform),
      name,
      quantity,
      measurement,
      price
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating proform item');
  }
});
