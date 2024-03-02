import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IInvoice,
  IInvoiceItems,
} from '../../../../../libs/typings/src/model/index';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = `${environment.apiBase}/api/v1/invoices`;

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: IInvoice, items: IInvoiceItems[]) {
    const invoicesItems = items.map((item) => ({
      ...item,
      invoices: invoiceData.id,
    }));
    const data = {
      ...invoiceData,
      items: invoicesItems,
    };
    return this.http.post(`${this.apiUrl}/`, data);
  }
  updateInvoice(
    invoiceId: number,
    invoiceData: IInvoice,
    itemData: IInvoiceItems[]
  ): Observable<any> {
    const invoiceItems = itemData.map((item) => ({
      //each item is associated with the correct invoice
      ...item,
      invoice: invoiceId,
    }));
    const data = {
      invoiceData,
      itemData: invoiceItems,
    };
    return this.http.put(`${this.apiUrl}/${invoiceId}`, data);
  }

  getAllInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiUrl}/`);
  }

  getInvoiceById(invoiceId: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${this.apiUrl}/${invoiceId}`);
  }

  getLastInvoiceNumber(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lastNumber`);
  }
}
