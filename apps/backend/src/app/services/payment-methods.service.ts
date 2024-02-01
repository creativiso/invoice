import { PaymentMethod } from '../model';

export class PaymentMethodsService {
  // Get all PaymentMethod
  async getAllPaymentMethods() {
    return PaymentMethod.findAll();
  }
}
