import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../../../../../../libs/typings/src';
import { Router } from '@angular/router';

@Component({
  selector: 'crtvs-invoices-list',
  templateUrl: './invoicesList.component.html',
  styleUrls: ['./invoicesList.component.scss'],
})
export class InvoicesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  invoices: IInvoice[] = [];

  constructor(
    private router: Router
  ) // private invoicesService: InvoicesService
  {}
  ngOnInit(): void {
    this.invoicesService.getAllProforms().subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-types
      next: (data: Object) => {
        // Change the parameter type to Object
        this.invoices = data as IInvoice[]; // Typecast the data to IProform[]
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all contractors completed.');
      },
    });
  }

  editContractor(contractor: IInvoice) {
    this.router.navigate(['/invoices', contractor.id, 'edit'], {
      state: { data: contractor },
    });
  }
}
