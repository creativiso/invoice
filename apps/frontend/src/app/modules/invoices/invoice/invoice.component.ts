import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ICurrency,
  IInvoice,
  IInvoiceItems,
} from '../../../../../../../libs/typings/src';
import { InvoiceService } from 'src/app/services/invoices.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { EMPTY, catchError, tap } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'crtvs-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoicesForm!: FormGroup;
  invoice!: IInvoice;
  invoiceId!: number;
  editMode!: boolean;
  invItems!: IInvoiceItems[];

  currencyList?: ICurrency[];
  selectedCurrency?: ICurrency;

  prefixes?: string[] = [
    '00 - 00000000000000',
    '00 - 0000000000',
    '00 - 00000000',
  ];

  invNum: number = 1;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private currenciesService: CurrenciesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.invoicesForm = this.fb.group({
      prefix: ['1', Validators.required],
      receiver: [],
      doc_type: [],
      invoice_items: [],
    });

    this.currenciesService
      .getAllCurrencies()
      .pipe(
        tap((res) => {
          if (res) {
            this.currencyList = res;
            this.selectedCurrency = this.currencyList[0];
          }
        }),
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe();

    this.invoiceService
      .getLastInvoiceNumber()
      .pipe(
        tap((res) => {
          if (res) {
            this.invNum = res.invoiceNum + 1;
            this.prefixes?.forEach((prefix, index, arr) => {
              arr[index] = this.formatPrefix(prefix);
            });
          }
        }),
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe();

    this.invoicesForm.get('doc_type')?.valueChanges.subscribe((value) => {
      this.selectedCurrency = value.currency;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.editMode = true;
      this.invoiceId = id;
    }

    if (this.editMode) {
      this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
        next: (response: any) => {
          const invoice: IInvoice = response.invoice;

          this.invoice = invoice;
          this.invNum = invoice.number;
          this.prefixes?.forEach((prefix, index, arr) => {
            arr[index] = this.formatPrefix(prefix);
          });

          this.invItems = invoice.items;

          console.log(this.invItems);

          this.invoicesForm.patchValue({
            prefix: invoice.prefix,
            receiver: {
              name: invoice.c_name,
              person: invoice.c_person,
              egn: invoice.c_egn,
              eik: invoice.c_eik,
              dds: invoice.c_ddsnumber,
              mol: invoice.c_mol,
              city: invoice.c_city,
              address: invoice.c_address,
            },
            doc_type: {
              issue_date: invoice.issue_date,
              event_date: invoice.event_date,
              type: String(invoice.type),
              currency: this.currencyList
                ? this.currencyList[invoice.currency - 1]
                : this.selectedCurrency,
              related_invoice_num: invoice.related_invoice_num,
            },
            invoice_items: {
              vatPercent: invoice.vat,
              wayOfPaying: invoice.payment_method,
              vatReason: invoice.novatreason,
            },
          });
        },
      });
    }
  }

  onSubmit() {
    if (this.invoicesForm.invalid) {
      const invalidFormMessage = 'Моля попъленете всички полета!';
      this.openSnackBar(invalidFormMessage);
      return;
    }
    const formData = this.invoicesForm.value;
    const dataInvoice: IInvoice = {
      prefix: 1, //-----------------???
      number: this.invNum, //-----------------???
      contractor_id: 1,
      issue_date: formData.doc_type.issue_date,
      event_date: formData.doc_type.event_date,
      receiver: formData.receiver.name,
      payment_method: formData.invoice_items.wayOfPaying, //--------------???
      vat: formData.invoice_items.vatPercent,
      novatreason: formData.invoice_items.vatReason,
      currency: formData.doc_type.currency.id,
      type: formData.doc_type.type,
      related_invoice_num: formData.doc_type.related_invoice_num,
      c_name: formData.receiver.name,
      c_city: formData.receiver.city,
      c_address: formData.receiver.address,
      c_eik: formData.receiver.eik,
      c_ddsnumber: formData.receiver.dds,
      c_mol: formData.receiver.mol,
      c_person: formData.receiver.person,
      c_egn: formData.receiver.egn,
      items: [],
    };

    const rows = formData.invoice_items.itemData;
    //dataInvoice.items = []; // Clear existing items before adding updated items
    for (let i = 0; i < rows.length; i++) {
      const dataInvoicesItems: IInvoiceItems = {
        name: rows[i].name,
        quantity: rows[i].quantity,
        measurement: rows[i].measurement,
        price: rows[i].price,
      };
      dataInvoice.items.push(dataInvoicesItems); // add the new item to the items array
    }

    if (this.editMode) {
      // Update existing invoice
      this.invoiceService
        .updateInvoice(this.invoiceId, dataInvoice, dataInvoice.items)
        .subscribe({
          next: (response) => {
            const successMessage = 'Фактурата е редактирана успешно.';
            // Display success message to the user
            this.openSnackBar(successMessage);
            this.router.navigate(['/invoices']);
          },
          error: (error) => {
            const errorMessage =
              'Редактирането на фактура беше неуспешно. Моля опитайте отново!';
            // Display error message to the user
            this.openSnackBar(errorMessage);
          },
        });
    } else {
      // Create new invoice
      this.invoiceService
        .createInvoice(dataInvoice, dataInvoice.items)
        .subscribe({
          next: (response) => {
            const successMessage = 'Фактурата е създадена успешно.';
            // Display success message to the user
            this.openSnackBar(successMessage);
            this.router.navigate(['/invoices']);
          },
          error: (error) => {
            const errorMessage =
              'Създаването на фактура беше неуспешно. Моля опитайте отново!';
            // Display error message to the user
            this.openSnackBar(errorMessage);
          },
        });
    }
  }

  formatPrefix(prefix: string): string {
    const paddedNumber = this.invNum
      .toString()
      .padStart(prefix.length - 7, '0');
    return `${prefix.slice(
      0,
      prefix.length - paddedNumber.length
    )}${paddedNumber}`;
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: {
        message: message,
        icon: 'close',
      },
    });
  }
}
