import { Router } from 'express';
import { SettingsService } from '../services/settings.service';

export const settingsRouter = Router();
const settingsService = new SettingsService();
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

settingsRouter.get('/prefixes', async (req, res) => {
  try {
    const prefixes = await settingsService.getPrefixes();
    if (!prefixes) {
      res.status(404).json({ message: 'Prefixes not found' });
    } else {
      res.json(prefixes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

settingsRouter.post('/', async (req, res) => {
  try {
    const newSetting = await settingsService.createSetting(req.body);
    res.json(newSetting);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

settingsRouter.put('/', async (req, res) => {
  try {
    const id = 1;
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

settingsRouter.patch('/prefixes', async (req, res) => {
   try {
     const id = 1;
     const updatedSetting = await settingsService.updateSetting(id, req.body);
     if (!updatedSetting) {
       res.status(404).json({ error: 'Setting not found' });
     } else {
       res.json(updatedSetting.prefixes);
     }
   } catch (error) {
     res.status(500).json({ error: 'Internal server error' });
   }
})

settingsRouter.delete('/', async (req, res) => {
  try {
    const id = 1;
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
