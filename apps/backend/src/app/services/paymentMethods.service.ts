import { PaymentMethod } from '../model';

export class PaymentMethodsService {
  // Get all payment methods
  async getAllPaymentMethods() {
    return PaymentMethod.findAll();
  }
}
