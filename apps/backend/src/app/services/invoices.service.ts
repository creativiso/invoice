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
    itemData: IInvoiceItems[] | undefined
  ) {
    const transaction = await sequelize.transaction();
    try {
      const invoice = await Invoice.findByPk(invoiceId, { transaction });
      if (!invoice) {
        throw new Error('Invoice not found');
      }

      // Update invoice fields individually
      Object.assign(invoice, { ...invoiceData, number: invoice.number });
      await invoice.save({ transaction });

      if (itemData && Array.isArray(itemData)) {
        // Delete existing invoice items
        await InvoiceItems.destroy({
          where: { invoice: invoiceId },
          transaction,
        });

        // Create new invoice items
        const invoiceItems = itemData.map((item) => ({
          ...item,
          invoice: invoiceId,
        }));
        await InvoiceItems.bulkCreate(invoiceItems, { transaction });
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

  async getLastInvoiceNumber(prefix: number, nextNum: number): Promise<number> {
    const lastInvoice = await Invoice.findOne({
      attributes: ['number'],
      where: {
        prefix: prefix,
      },
      order: [['number', 'DESC']],
    });

    if (lastInvoice) {
      return lastInvoice.number <= nextNum ? nextNum : lastInvoice.number;
    } else {
      return nextNum - 1;
    }
  }
}
