import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentMethod } from '../../../../../libs/typings/src';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  private apiUrl = `${environment.apiBase}/api/v1/paymentMethods`;

  constructor(private http: HttpClient) {}

  getAllPaymentMethods(): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(`${this.apiUrl}`);
  }
}
