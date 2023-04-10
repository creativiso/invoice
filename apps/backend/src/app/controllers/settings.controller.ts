import { Router } from 'express';
import { SettingsService } from '../services/settings.service';

export const settingsRouter = Router();
const settingsService = new SettingsService();

// read settings
// settingsRouter.get('/', async (req, res) => {
//   const settings = await settingsService.getSettings();
//   res.json(settings);
// });

settingsRouter.get('/', async (req, res) => {
  try {
    const settings = await settingsService.getSettings();
    if (!settings) {
      res.status(404).json({ message: 'Settings not found' });
    } else {
      res.json(settings);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// create a new setting
settingsRouter.post('/', async (req, res) => {
  try {
    const newSetting = await settingsService.createSetting(req.body);
    res.json(newSetting);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// update a setting by id
settingsRouter.put('/', async (req, res) => {
  try {
    const id = 1; // set id to 1
    const updatedSetting = await settingsService.updateSetting(id, req.body);
    if (!updatedSetting) {
      res.status(404).json({ error: 'Setting not found' });
    } else {
      res.json(updatedSetting);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete 
settingsRouter.delete('/', async (req, res) => {
  try {
    const id = 1; // set id to 1
    const deletedSetting = await settingsService.deleteSetting(id);
    if (!deletedSetting) {
      res.status(404).json({ error: 'Setting not found' });
    } else {
      res.json(deletedSetting);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});