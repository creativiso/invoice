import { Settings } from '../model/models/Settings';
import { ISettings} from '../../../../../libs/typings/src/index'

export class SettingsService {
  async getSettings() {
    const id =1;
    const setting =  await Settings.findByPk(id);
    if(!setting)
    {
      const defaultSettings: ISettings = {
        supplierName: '',
        supplierVatNumber: '',
        supplierCity: '',
        supplierAddress: '',
        iban: '',
        bicSwift: '',
        bank: '',
        dds: false,
        paymentMethod: '',
        individualPerson: false,
        quantityNumber: 2,
        singlePriceNumber: 2,
        totalPriceNumber: 2,
        supplierEik: '',
        supplierManager: '',
        units: []
      };
  
      // create the new settings object in the database
      const newSettings = await Settings.create(defaultSettings);
  
      return newSettings;
    }
  }

  async createSetting(data: Settings): Promise<Settings> {
    return Settings.create(data);
  }

  async updateSetting(id: number, data: Partial<Settings>): Promise<Settings | null> {
    const setting = await Settings.findByPk(id);
    if (!setting) {
      return null;
    }
    return setting.update(data);
  }

async deleteSetting(id: number): Promise<boolean> {
  const setting = await Settings.findByPk(id);
  if (!setting) {
    return false;
  }
  await setting.destroy();
  return true;
}
}

