import { Router } from 'express';
import { ProformService } from '../services/proform.service';
import { IProform, IProformItem } from 'libs/typings/src/model';

export const proformsRouter = Router();
const proformService = new ProformService();

//read all proforms
proformsRouter.get('/', async (req, res) => {
  try {
    const proforms = await proformService.getProformsAndItems();
    res.json(proforms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching proforms');
  }
});

//read by id proforms and proformitems
proformsRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const proformAndItems = await proformService.getProformAndItemsById(id);
    res.json({ proformAndItems });
  } catch (error) {
    res.status(404).json({ error: 'Proform not found' });
  }
});

// create proform
proformsRouter.post('/add', async (req, res) => {
  try {
    const proform: IProform = {
      contractor: req.body.contractor,
      issue_date: req.body.issue_date,
      bank_payment: req.body.bank_payment,
      vat: req.body.vat,
      novatreason: req.body.novatreason,
      currency: req.body.currency,
      rate: req.body.rate,
      c_name: req.body.c_name,
      c_city: req.body.c_city,
      c_address: req.body.c_address,
      c_eik: req.body.c_eik,
      c_ddsnumber: req.body.c_ddsnumber,
      c_mol: req.body.c_mol,
      c_person: req.body.c_person,
      c_egn: req.body.c_egn,
      p_name: req.body.p_name,
      p_city: req.body.p_city,
      p_address: req.body.p_address,
      p_eik: req.body.p_eik,
      p_ddsnumber: req.body.p_ddsnumber,
      p_mol: req.body.p_mol,
      p_bank: req.body.p_bank,
      p_iban: req.body.p_iban,
      p_bic: req.body.p_bic,
      p_zdds: req.body.p_zdds,
      author: req.body.author,
      author_user: req.body.author_user,
      author_sign: req.body.author_sign,
    };
    const items: IProformItem[] = req.body.items;
    const result = await proformService.createProformWithItems(proform, items);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message + ' Cannot create proform' });
  }
});

proformsRouter.put('/:proform/items/:id', async (req, res) => {
  try {
    const { proform, id } = req.params;
    const updatedItem = await proformService.updateProformWithItems(
      Number(proform),
      Number(id),
      req.body as IProform,
      req.body as IProformItem
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating proform item');
  }
});
