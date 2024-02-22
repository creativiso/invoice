import { Router } from 'express';
import { InvoicesService } from '../services/invoices.service';
import { IInvoice, IInvoiceItems } from 'libs/typings/src/model/index';
import generateUserSignature from '../utils/generate-user-signature';

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

    const invoice = await invoicesService.getInvoicesAndItemsById(id);
    res.json({ invoice });
  } catch (error) {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

invoicesRouter.post('/', async (req, res) => {
  // @ts-ignore
  const user = req.user;

  try {
    const invoice: IInvoice = {
      prefix: req.body.prefix,
      number: req.body.number,
      contractor_id: req.body.contractor_id,
      issue_date: req.body.issue_date,
      event_date: req.body.event_date,
      receiver: req.body.receiver,
      payment_method: req.body.payment_method,
      vat: req.body.vat,
      novatreason: req.body.novatreason,
      currency: req.body.currency,
      type: req.body.type,
      related_invoice_num: req.body.related_invoice_num,
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
    const result = await invoicesService.createInvoiceWithItems(
      invoice,
      req.body.items
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message + ' Cannot create invoice' });
  }
});

invoicesRouter.put('/:id', async (req, res) => {
  try {
    const invoiceId = Number(req.params.id);
    const invoiceData = req.body.invoiceData as IInvoice;
    const itemData = req.body.itemData as IInvoiceItems[];
    const updatedItem = await invoicesService.updateInvoiceWithItems(
      invoiceId,
      invoiceData,
      itemData
    );

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating invoices item:', error); // Log the error for debugging
    res.status(500).send('Error updating invoices item');
  }
});
