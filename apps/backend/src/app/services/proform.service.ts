import { IProform, IProformItem } from 'libs/typings/src/model';
import { sequelize } from '../model';
import { Proform } from '../model/models/Proform';
import { ProformItem } from '../model/models/ProformItem';

export class ProformService {
  async createProformWithItems(proformData: IProform, items: IProformItem[]) {
    let result;
    const transaction = await sequelize.transaction();
    try {
      const proform = await Proform.create(
        {
          ...proformData,
        },
        { transaction }
      );
      const proformItems = items.map((item) => ({
        ...item,
        proform: proform.id,
      }));
      await ProformItem.bulkCreate(proformItems, { transaction });
      await transaction.commit();
      result = {
        success: true,
        message: 'Proform and ProformItems created successfully',
        proform: proform.id,
      };
    } catch (error) {
      await transaction.rollback();
      result = {
        success: false,
        message: 'Failed to create Proform and ProformItems',
        error,
      };
    }
    return result;
  }

  async updateProformWithItems(
    proformId: number,
    proformData: IProform,
    itemData: IProformItem[]
  ) {
    let result;
    const transaction = await sequelize.transaction();
    try {
      const proform = await Proform.findByPk(proformId, { transaction });
      if (!proform) {
        throw new Error('Proform not found');
      }
      await proform.update(proformData, { transaction });

      if (itemData && Array.isArray(itemData)) {
        // Delete existing invoice items
        await ProformItem.destroy({
          where: { proform: proformId },
          transaction,
        });

        // Create new invoice items
        const proformItems = itemData.map((item) => ({
          ...item,
          proform: proformId,
        }));
        await ProformItem.bulkCreate(proformItems, { transaction });
      }

      await transaction.commit();
      result = {
        success: true,
        message: 'Proform and ProformItem updated successfully',
      };
    } catch (error) {
      await transaction.rollback();
      result = {
        success: false,
        message: 'Failed to update Proform and ProformItem',
        error,
      };
    }
    return result;
  }

  async getProformsAndItems(): Promise<Proform[]> {
    return Proform.findAll({
      include: [
        {
          model: ProformItem,
          as: 'items',
          association: Proform.associations.items,
        },
      ],
    });
  }

  async getProformAndItemsById(id: number): Promise<Proform | null> {
    return Proform.findOne({
      where: { id },
      include: [
        {
          model: ProformItem,
          as: 'items',
          association: Proform.associations.items,
        },
      ],
    });
  }
}
