import { Router } from 'express';
import { InvoicesService } from '../services/invoices.service';
import { IInvoice, IInvoiceItems } from 'libs/typings/src';

export const invoicesRouter = Router();
const invoicesService = new InvoicesService();

//read all invoices
invoicesRouter.get('/', async (req, res) => {
  try {
    const invoices = await invoicesService.getInvoicesAndItems();
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching invoices');
  }
});

//read by id proforms and proformitems
invoicesRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const invoiceAndItems = await invoicesService.getInvoicesAndItemsById(id);
    res.json({ invoiceAndItems });
  } catch (error) {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

invoicesRouter.post('/add', async (req, res) => {
  try {
    const invoice: IInvoice = {
      prefix: req.body.prefix,
      number: req.body.number,
      contractor: req.body.contractor,
      issue_date: req.body.issue_date,
      event_date: req.body.event_date,
      receiver: req.body.receiver,
      bank_payment: req.body.bank_payment,
      vat: req.body.vat,
      novatreason: req.body.novatreason,
      currency: req.body.currency,
      rate: req.body.rate,
      type: req.body.type,
      related_date: req.body.related_date,
      related_invoice: req.body.related_invoice,
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
      items: req.body.items, // add items property here
    };
    const result = await invoicesService.createInvoiceWithItems(
      invoice,
      req.body.items
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message + ' Cannot create invoice' });
  }
});

invoicesRouter.put('/:invoice/items/:id', async (req, res) => {
  try {
    const { invoice, id } = req.params;
    const updatedItem = await invoicesService.updateInvoiceWithItems(
      Number(invoice),
      Number(id),
      req.body as IInvoice,
      req.body as IInvoiceItems
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating invoices item');
  }
});