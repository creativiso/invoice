import { PaymentMethod } from '../model';

export class PaymentMethodsService {
  // Get all PaymentMethods
  async getAllPaymentMethods() {
    return PaymentMethod.findAll();
  }
}
