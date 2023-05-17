import { IInvoice, IInvoiceItems } from 'libs/typings/src/model';
import { Invoice, InvoiceItems, sequelize } from '../model';

export class InvoicesService {
  async createInvoiceWithItems(invoiceData: IInvoice, items: IInvoiceItems[]) {
    let result;
    const transaction = await sequelize.transaction();
    try {
      const invoice = await Invoice.create(
        {
          ...invoiceData,
        },
        { transaction }
      );
      const invoiceItems = items.map((item) => ({
        ...item,
        invoice: invoice.id,
      }));
      await invoiceItems.bulkCreate(invoiceItems, { transaction });
      await transaction.commit();
      result = {
        success: true,
        message: 'Invoices created successfully',
        invoice: invoice.id,
      };
    } catch (error) {
      await transaction.rollback();
      result = {
        success: false,
        message: 'Failed to create Invoices',
        error,
      };
    }
    return result;
  }

  async updateInvoiceWithItems(
    invoiceId: number,
    itemId: number,
    invoiceData: IInvoice,
    itemData: IInvoiceItems
  ) {
    let result;
    const transaction = await sequelize.transaction();
    try {
      const invoice = await Invoice.findByPk(invoiceId, { transaction });
      if (!invoice) {
        throw new Error('Invoice not found');
      }
      await invoice.update(invoiceData, { transaction });

      const invoiceItem = await InvoiceItems.findOne({
        where: { id: itemId, invoice: invoiceId },
        transaction,
      });
      if (!invoiceItem) {
        throw new Error('Invoice item not found');
      }
      await invoiceItem.update(itemData, { transaction });

      await transaction.commit();
      result = {
        success: true,
        message: 'Invoices updated successfully',
      };
    } catch (error) {
      await transaction.rollback();
      result = {
        success: false,
        message: 'Failed to update Invoices and Invoicesitems',
        error,
      };
    }
    return result;
  }

  async getInvoicesAndItems(): Promise<Invoice[]> {
    return Invoice.findAll({
      include: [
        {
          model: InvoiceItems,
          as: 'items',
          association: Invoice.associations.items,
        },
      ],
    });
  }

  async getInvoicesAndItemsById(id: number): Promise<Invoice | null> {
    return Invoice.findOne({
      where: { id },
      include: [
        {
          model: InvoiceItems,
          as: 'items',
          association: Invoice.associations.items,
        },
      ],
    });
  }
}
