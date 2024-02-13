import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentMethod } from '../../../../../libs/typings/src';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  private apiUrl = 'http://localhost:3333/api/v1/paymentMethods';

  constructor(private http: HttpClient) {}

  getAllPaymentMethods(): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(`${this.apiUrl}`);
  }
}
