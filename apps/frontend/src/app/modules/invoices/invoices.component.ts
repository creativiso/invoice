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
<<<<<<< HEAD
    this.invoicesForm.get('c_person')?.valueChanges.subscribe((c_person) => {
      const eikControl = this.invoicesForm.get('eik');
      const egnControl = this.invoicesForm.get('egn');

      if (c_person === true) {
        eikControl?.clearValidators();
        //egnControl?.setValidators([Validators.required, egnValidator()]);
      }

      eikControl?.updateValueAndValidity();
      egnControl?.updateValueAndValidity();
    });
    const receiverEikField = document.getElementById('receiverEik');
    const receiverVatNumberField = document.getElementById('receiverVatNumber');
    const receiverEgnField = document.getElementById('receiverEgn');

    this.invoicesForm
      .get('c_person')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          receiverEikField?.classList.add('hidden');
          receiverVatNumberField?.classList.add('hidden');
          receiverEgnField?.classList.remove('hidden');
        } else {
          receiverEikField?.classList.remove('hidden');
          receiverVatNumberField?.classList.remove('hidden');
          receiverEgnField?.classList.add('hidden');
        }
      });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Retrieving invoice data for ID:', id);
    this.invoiceId = id ? id : undefined;
    if (id !== null) {
      this.invoiceService.getInvoiceById(id).subscribe((response: any) => {
        const invoice: IInvoice = response.invoice; // Cast the response

        this.invoiceService.getInvoiceById(id).subscribe({
          next: (data: IInvoice) => {
             
            this.invoice = data;

            this.invoicesForm.patchValue({
              p_name: invoice.p_name,
              p_eik: invoice.p_eik,
              p_ddsnumber: invoice.p_ddsnumber,
              p_mol: invoice.p_mol,
              p_city: invoice.p_city,
              p_address: invoice.p_address,
              c_name: invoice.c_name,
              c_person: invoice.c_person,
              c_egn: invoice.c_egn,
              c_eik: invoice.c_eik,
              c_ddsnumber: invoice.c_ddsnumber,
              c_mol: invoice.c_mol,
              c_city: invoice.c_city,
              c_address: invoice.c_address,
              issue_date: invoice.issue_date,
              event_date: invoice.event_date,
              currency: invoice.currency,
              type: String(invoice.type),
              vatPercent: invoice.vat,
              wayOfPaying: String(invoice.bank_payment),
              vatReason: invoice.novatreason,
              //rowData: invoice.items,
              rowData: [],
            });

            while (this.rowData.length !== 0) {
              this.rowData.removeAt(0);
            }

            // Add rows for each item in the invoice
            for (const item of invoice.items) {
              this.addRowWithData(item);
            }
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            console.log('Get invoice by id completed.');
          },
        });
      });
    }
=======
>>>>>>> master
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
