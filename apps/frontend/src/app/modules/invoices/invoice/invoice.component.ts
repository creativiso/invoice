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
import { EMPTY, catchError, distinctUntilChanged, tap } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { SettingService } from 'src/app/services/settings.service';

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

  prefixes: { prefix: string; nextNum: number }[] = [];
  selectedPrefixId: number = 0;

  invNum: number = 1;
  prevReceiver: string = '';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private currenciesService: CurrenciesService,
    private _snackBar: MatSnackBar,
    private settingsService: SettingService
  ) {}

  ngOnInit() {
    this.invoicesForm = this.fb.group({
      prefix: [0, Validators.required],
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

    this.invoicesForm.get('prefix')?.valueChanges.subscribe((prefix) => {
      this.selectedPrefixId = prefix;

      const selectedPrefix = this.prefixes[this.selectedPrefixId];

      if (!this.editMode) {
        this.invNum = selectedPrefix.nextNum;
      } else {
        this.prefixes[this.selectedPrefixId].nextNum = this.invNum;
      }
    });

    this.invoicesForm.get('doc_type')?.valueChanges.subscribe((value) => {
      this.selectedCurrency = value.currency;
    });

    this.invoicesForm
      .get('receiver')
      ?.valueChanges.pipe(
        distinctUntilChanged((prev, curr) => prev.name === curr.name)
      )
      .subscribe((value) => {
        const currReceiver =
          this.invoicesForm.get('invoice_items')?.value.receiver;

        if (this.prevReceiver === currReceiver) {
          this.invoicesForm.get('invoice_items')?.patchValue({
            receiver: value.name,
          });
          this.prevReceiver =
            this.invoicesForm.get('invoice_items')?.value.receiver;
        }
      });

    this.settingsService.getPrefixes().subscribe((prefixes) => {
      this.prefixes = prefixes
        .filter((prefix) => prefix.id === undefined)
        .map((prefix, index) => {
          if (!this.editMode) {
            this.invoiceService
              .getLastInvoiceNumber(index)
              .pipe(
                tap((res) => {
                  if (res) {
                    const lastInvNum = res.invoiceNum;

                    if (lastInvNum < prefix.nextNum) {
                      prefix.nextNum = Number(prefix.nextNum);
                    } else {
                      prefix.nextNum = lastInvNum + 1;
                    }

                    if (this.selectedPrefixId === index) {
                      this.invNum = prefix.nextNum;
                    }
                  }
                }),
                catchError((error) => {
                  return EMPTY;
                })
              )
              .subscribe();
          }
          return prefix;
        });

      if (!this.editMode) {
        const defPrefDataId = prefixes.findIndex(
          (prefix) => prefix.id !== undefined
        );

        const defPrefixId = prefixes[defPrefDataId].id;

        this.invoicesForm.get('prefix')?.setValue(defPrefixId);
      }
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.editMode = true;
      this.invoiceId = id;
    }

    if (this.editMode) {
      this.invoicesForm.get('prefix')?.disable();
      this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
        next: (response: any) => {
          const invoice: IInvoice = response.invoice;

          this.invoice = invoice;
          this.invNum = invoice.number;
          this.invItems = invoice.items;

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
              receiver: invoice.receiver,
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
    console.log(formData.prefix);
    const dataInvoice: IInvoice = {
      prefix: this.selectedPrefixId,
      number: this.invNum,
      contractor_id: 1,
      issue_date: formData.doc_type.issue_date,
      event_date: formData.doc_type.event_date,
      receiver: formData.invoice_items.receiver,
      payment_method: formData.invoice_items.wayOfPaying,
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

  formatInvNumber(numberToFormat?: number): string {
    const number = '00000000';

    if (!numberToFormat && numberToFormat !== 0) {
      numberToFormat = this.invNum;
    }

    const paddedNumber = numberToFormat
      .toString()
      .padStart(number.length - 7, '0');
    return `${number.slice(
      0,
      number.length - paddedNumber.length
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
