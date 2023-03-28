import { Settings } from '../model/models/Settings';

export class SettingsService {
  // get all settings
  async getAllSettings(): Promise<Settings[]> {
    return Settings.findAll();
  }
  // create a new setting
  async createSetting(data: Settings): Promise<Settings> {
    return Settings.create(data);
  }

  // update a setting by id
  async updateSetting(id: number, data: Partial<Settings>): Promise<Settings | null> {
    const setting = await Settings.findByPk(id);
    if (!setting) {
      return null;
    }
    return setting.update(data);
  }
}