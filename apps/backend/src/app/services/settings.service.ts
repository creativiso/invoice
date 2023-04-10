import { Settings } from '../model/models/Settings';

export class SettingsService {
  // get all settings
  async getSettings() {
    const id =1;
    return await Settings.findByPk(id);
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

  // delete a setting by id
async deleteSetting(id: number): Promise<boolean> {
  const setting = await Settings.findByPk(id);
  if (!setting) {
    return false;
  }
  await setting.destroy();
  return true;
}

}
