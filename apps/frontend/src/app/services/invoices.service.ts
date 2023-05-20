import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice, IInvoiceItems } from '../../../../../libs/typings/src/index';
import { Observable, catchError, throwError } from 'rxjs';

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
    invoiceId: number,
    invoicesData: IInvoice,
    itemId: number,
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
    return this.http.put(
      `${this.apiUrl}/${invoiceId}/items/${itemId}/edit`,
      data
    );
  }
  getAllInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiUrl}/`);
  }

  getInvoiceById(invoiceId: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${this.apiUrl}/${invoiceId}`).pipe(
      catchError((error: any) => {
        console.error('Error occurred while fetching invoice:', error);
        // Handle the error if necessary
        return throwError(error);
      })
    );
  }
}
