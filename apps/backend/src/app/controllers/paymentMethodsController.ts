import { Router } from 'express';
import { PaymentMethodsService } from '../services/paymentMethods.service';

export const paymentMethodsRouter = Router();
const paymentMethodsService = new PaymentMethodsService();

// Get Payment methods list
paymentMethodsRouter.get('/', async (_req, res) => {
  try {
    const paymentMethods = await paymentMethodsService.getAllPaymentMethods();
    res.json(paymentMethods);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching Payment Methods!');
  }
});
