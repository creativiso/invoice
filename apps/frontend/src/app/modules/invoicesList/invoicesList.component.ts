import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../../../../../../libs/typings/src';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoices.service';

@Component({
  selector: 'crtvs-invoices-list',
  templateUrl: './invoicesList.component.html',
  styleUrls: ['./invoicesList.component.scss'],
})
export class InvoicesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'amount', 'tools'];

  invoices: IInvoice[] = [];

  constructor(
    private router: Router,
    private invoicesService: InvoiceService
  ) {}
  ngOnInit(): void {
    this.invoicesService.getAllInvoices().subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-types
      next: (data: Object) => {
        this.invoices = data as IInvoice[];
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all contractors completed.');
      },
    });
  }

  // editInvoices(invoices: IInvoice) {
  //   this.router.navigate(['/invoices', invoices.id, 'edit'], {
  //     state: { data: invoices },
  //   });
  // }
}
