import { Router } from 'express';
import { CurrenciesService } from '../services/currencies.service';

export const currenciesRouter = Router();
const currenciesService = new CurrenciesService();

// Get Currencies List
currenciesRouter.get('/', async (_req, res) => {
  try {
    const currencies = await currenciesService.getAllCurrencies();
    res.json(currencies);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching currencies');
  }
});
