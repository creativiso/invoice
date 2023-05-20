import { Component, OnInit, ViewChild } from '@angular/core';
import { IInvoice, IInvoiceItems } from '../../../../../../libs/typings/src';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoices.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'crtvs-invoices-list',
  templateUrl: './invoicesList.component.html',
  styleUrls: ['./invoicesList.component.scss'],
})
export class InvoicesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'date', 'amount', 'tools'];

  invoices: IInvoice[] = [];
  item!: IInvoiceItems;
  dataSource = new MatTableDataSource<IInvoice>(this.invoices);
  constructor(
    private router: Router,
    private invoicesService: InvoiceService
  ) {}
  ngOnInit(): void {
    this.invoicesService.getAllInvoices().subscribe({
      next: (data: IInvoice[]) => {
        this.invoices = data;
        this.dataSource.data = this.invoices;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all invoices completed.');
      },
    });
  }

  editInvoice(invoice: IInvoice, item: IInvoiceItems) {
    this.router.navigate(['/invoices', invoice.id, 'items', item.id, 'edit'], {
      state: { data: { invoice, item } },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
