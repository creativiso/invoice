import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  IInvoice,
  IInvoiceItems,
} from '../../../../../../libs/typings/src/model/index';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from 'src/app/services/invoices.service';

@Component({
  selector: 'crtvs-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'date', 'amount', 'tools'];

  invoices: IInvoice[] = [];
  item!: IInvoiceItems;
  dataSource = new MatTableDataSource<IInvoice>(this.invoices);
  constructor(
    private router: Router,
    private invoicesService: InvoiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.invoicesService.getAllInvoices().subscribe({
      next: (data: IInvoice[]) => {
        this.invoices = data;
        this.dataSource.data = this.invoices;
      },
    });
  }

  editInvoice(invoice: IInvoice) {
    this.router.navigate([invoice.id], {
      relativeTo: this.route,
      state: { data: { invoice } },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
