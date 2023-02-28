import { Router } from 'express';
import { ProformService } from '../services/proform.service';

export const proformsRouter = Router();
const proformService = new ProformService();
//read all proforms
proformsRouter.get('/', async (req, res) => {
  const proforms = await proformService.getAllContractors();
  res.json(proforms);
});
//read by id proforms
proformsRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const proform = await proformService.getContractorById(id);
    res.json(proform);
  } catch (error) {
    res.status(404).json({ error: 'Proforms not found' });
  }
});
//create Proform
proformsRouter.post('/', async (req, res) => {
  const {
    contractor,
    issue_date,
    bank_payment,
    vat,
    novatreason,
    currency,
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
  const proform = await proformService.createProform(
    contractor,
    issue_date,
    bank_payment,
    vat,
    novatreason,
    currency,
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
  );
  res.json(proform);
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
    res.status(404).json({ error: 'Proform not found' });
  }
});
