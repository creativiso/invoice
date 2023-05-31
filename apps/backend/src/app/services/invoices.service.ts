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
    itemData: IInvoiceItems[]
  ) {
    const transaction = await sequelize.transaction();
    try {
      const invoice = await Invoice.findByPk(invoiceId, { transaction });
      if (!invoice) {
        throw new Error('Invoice not found');
      }
      await invoice.update(invoiceData, { transaction });

      for (const item of itemData) {
        // Use 'item' instead of 'itemData'
        const invoiceItem = await InvoiceItems.findOne({
          where: { invoice: invoiceId, id: item.id },
          transaction,
        });
        if (!invoiceItem) {
          throw new Error('Invoice item not found');
        }
        await invoiceItem.update(item, { transaction });
      }

      await transaction.commit();
      return {
        success: true,
        message: 'Invoice and invoice items updated successfully',
      };
    } catch (error) {
      await transaction.rollback();
      return {
        success: false,
        message: 'Failed to update invoice and invoice items',
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
