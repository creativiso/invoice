import { Currency } from '../model';

export class CurrenciesService {
  // Get all currencies
  async getAllCurrencies() {
    return Currency.findAll();
  }
}
