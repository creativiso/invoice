import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice, IInvoiceItems } from '../../../../../libs/typings/src/index';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://localhost:3333/api/v1/invoices';

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
    return this.http.post(`${this.apiUrl}/add`, data);
  }
  updateInvoice(
    invoicesId: number,
    invoicesData: IInvoice,
    items: IInvoiceItems[]
  ) {
    const invoicesItems = items.map((item) => ({
      ...item,
      invoice: invoicesData.id,
    }));
    const data = {
      ...invoicesData,
      items: invoicesItems,
    };
    return this.http.put(`${this.apiUrl}/${invoicesId}`, data);
  }
  getAllInvoices() {
    return this.http.get(`${this.apiUrl}/`);
  }

  getInvoiceById(invoiceId: number) {
    return this.http.get(`${this.apiUrl}/${invoiceId}`);
  }
}
