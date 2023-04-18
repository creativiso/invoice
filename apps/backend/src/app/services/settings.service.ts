import { Settings } from '../model/models/Settings';

export class SettingsService {
  async getSettings() {
    const id =1;
    return await Settings.findByPk(id);
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
