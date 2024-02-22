import { Router } from 'express';
import { ProformService } from '../services/proform.service';
import { IProform, IProformItem } from 'libs/typings/src/model';
import generateUserSignature from '../utils/generate-user-signature';

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

proformsRouter.post('/add', async (req, res) => {
  // @ts-ignore
  const user = req.user;

  try {
    const proform: IProform = {
      contractor_id: req.body.contractor_id,
      issue_date: req.body.issue_date,
      payment_method: req.body.payment_method,
      vat: req.body.vat,
      novatreason: req.body.novatreason,
      currency: req.body.currency,
      c_name: req.body.c_name,
      c_city: req.body.c_city,
      c_address: req.body.c_address,
      c_eik: req.body.c_eik,
      c_ddsnumber: req.body.c_ddsnumber,
      c_mol: req.body.c_mol,
      c_person: req.body.c_person,
      c_egn: req.body.c_egn,
      author: user.userName,
      author_sign: generateUserSignature(user.userId),
      items: req.body.items, // add items property here
    };
    const result = await proformService.createProformWithItems(
      proform,
      req.body.items
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message + ' Cannot create proform' });
  }
});

proformsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await proformService.updateProformWithItems(
      Number(id),
      req.body as IProform,
      req.body.items as IProformItem[]
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating proform item');
  }
});
