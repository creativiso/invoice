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
      await InvoiceItems.bulkCreate(invoiceItems, { transaction });
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
    invoiceData: IInvoice,
    itemData: IInvoiceItems
  ) {
    const transaction = await sequelize.transaction();
    try {
      const invoice = await Invoice.findByPk(invoiceId, { transaction });
      if (!invoice) {
        throw new Error('Invoice not found');
      }
      await invoice.update(invoiceData, { transaction });
      for (const itemData of invoiceData.items) {
        const invoiceItem = await InvoiceItems.findOne({
          where: { invoice: invoiceId },
          transaction,
        });
        if (!invoiceItem) {
          throw new Error('Proform item not found');
        }
        await invoiceItem.update(itemData, { transaction });
      }

      await transaction.commit();
      return {
        success: true,
        message: 'Invoices updated successfully',
      };
    } catch (error) {
      await transaction.rollback();
      return {
        success: false,
        message: 'Failed to update Invoices and Invoicesitems',
        error,
      };
    }
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
    return Invoice.findByPk(id, {
      include: [
        {
          model: InvoiceItems,
          as: 'items',
        },
      ],
    });
  }
}
