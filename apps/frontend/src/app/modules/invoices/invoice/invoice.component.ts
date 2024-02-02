import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { EMPTY, catchError, tap } from 'rxjs';
import {
  ICurrency,
  IInvoice,
  IInvoiceItems,
} from '../../../../../../../libs/typings/src';
import { InvoiceService } from 'src/app/services/invoices.service';

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

  currencyList?: ICurrency[] | null;
  selectedCurrency?: ICurrency;
  selectedCurrencyId?: number;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit() {
    this.currenciesService
      .getAllCurrencies()
      .pipe(
        tap((res) => {
          if (res) {
            this.currencyList = res;
            this.selectedCurrency = this.currencyList[0];
            this.selectedCurrencyId = this.currencyList[0]?.id;
            console.log(this.currencyList);
          }
        }),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe();

    this.invoicesForm = this.fb.group({
      provider: [],
      receiver: [],
      type: ['', Validators.required], // neww
      issue_date: ['', Validators.required], //new
      event_date: ['', Validators.required], //new
      related_invoice: [],
      related_date: [],
      currency: [this.selectedCurrency?.code, Validators.required],
      invoice_items: [],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.editMode = true;
      this.invoiceId = id;
    }

    console.log('Retrieving invoice data for ID:', id);
    if (this.editMode) {
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
              rowData: invoice.items,
            });
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
  }

  onSubmit() {
    // if (this.invoicesForm.invalid) {
    //   // Form is not valid, display error messages
    //   alert('Моля, въведете всички полета.');
    //   return;
    // }
    const formData = this.invoicesForm.value;
    const dataInvoice: IInvoice = {
      prefix: 1, //-----------------???
      number: 1, //-----------------???
      contractor: 1, //----------------------????
      issue_date: formData.issue_date,
      event_date: formData.event_date,
      receiver: formData.receiver.name,
      bank_payment: formData.invoice_items.wayOfPaying, //--------------???
      vat: formData.vatPercent,
      novatreason: formData.vatReason,
      // currency: formData.currency.currencyCode,
      currency: formData.currency.id,
      rate: formData.currency.exchangeRate,
      type: formData.type,
      related_invoice: formData.related_invoice,
      related_date: formData.related_date,
      c_name: formData.receiver.name,
      c_city: formData.receiver.city,
      c_address: formData.receiver.address,
      c_eik: formData.receiver.eik,
      c_ddsnumber: formData.receiver.dds,
      c_mol: formData.receiver.mol,
      c_person: formData.receiver.person,
      c_egn: formData.receiver.egn,
      p_name: '',
      p_city: '',
      p_address: '',
      p_eik: '',
      p_ddsnumber: '',
      p_mol: '',
      p_bank: 'Some bank',
      p_iban: 'Some iban',
      p_bic: 'Some bic',
      p_zdds: true,
      author: 'Some author',
      author_user: 1,
      author_sign: 'Some sign',
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

    console.log(formData);
    console.log(dataInvoice);

    if (this.editMode) {
      // Update existing invoice
      this.invoiceService
        .updateInvoice(this.invoiceId, dataInvoice, dataInvoice.items)
        .subscribe({
          next: (response) => {
            console.log('HTTP request successful:', response);
            console.log('dataInvoice:', JSON.stringify(dataInvoice));

            const successMessage = 'Invoice updated successfully.';
            // Display success message to the user
            alert(successMessage);
          },
          error: (error) => {
            console.error('Error occurred:', error);
            const errorMessage = 'Invoice update failed. Please try again.';
            // Display error message to the user
            alert(errorMessage);
          },
        });
    } else {
      // Create new invoice
      this.invoiceService
        .createInvoice(dataInvoice, dataInvoice.items)
        .subscribe({
          next: (response) => {
            console.log('HTTP request successful:', response);
            const successMessage = 'Фактурата е създадена успешно.';
            // Display success message to the user
            alert(successMessage);
          },
          error: (error) => {
            console.error('Error occurred:', error);
            const errorMessage =
              'Създаването на фактура беше неуспешно, моля опитайте отново!';
            // Display error message to the user
            alert(errorMessage);
          },
          complete: () => {
            console.log('HTTP request complete');
          },
        });
    }
  }
}
