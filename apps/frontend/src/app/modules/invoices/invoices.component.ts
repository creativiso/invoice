import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { InvoiceService } from '../../services/invoices.service';
import { IInvoice, IInvoiceItems } from 'libs/typings/src/model/index';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'crtvs-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  invoicesForm!: FormGroup;
  rowAmount = 0;
  totalAmount = 0;
  quantity = 0;
  priceWithoutVat = 0;
  vatPercent = 0;
  invoice!: IInvoice;
  invoiceId!: number;
  get rowData() {
    return this.invoicesForm.get('rowData') as FormArray;
  }
  public currencies = [
    { exchangeRate: 1, currencyCode: 'лв' },
    { exchangeRate: 1.95, currencyCode: '€' },
  ];
  currencyFormatters = {
    Лев: new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'BGN' }),
    Евро: new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'EUR',
    }),
  };

  selectedCurrency = this.currencies[0];
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    //
  }

  ngOnInit() {
    this.invoicesForm = this.fb.group({
      p_name: ['', Validators.required],
      p_eik: ['', Validators.required],
      p_ddsnumber: [''],
      p_mol: ['', Validators.required],
      p_city: ['', Validators.required],
      p_address: ['', Validators.required],
      c_name: ['', Validators.required],
      c_person: [false],
      c_egn: [''],
      c_eik: [''],
      c_ddsnumber: [''],
      c_mol: ['', Validators.required],
      c_city: ['', Validators.required],
      c_address: ['', Validators.required],
      type: ['', Validators.required], // neww
      issue_date: ['', Validators.required], //new
      event_date: ['', Validators.required], //new
      related_invoice: [],
      related_date: [],
      currency: [this.selectedCurrency, Validators.required],
      rowData: this.fb.array([
        this.fb.group({
          nameField: ['', Validators.required],
          quantity: ['', Validators.required],
          priceWithoutVat: ['', Validators.required],
          measure: [''],
          amount: [''],
        }),
      ]),
      vatPercent: ['', Validators.required],
      wayOfPaying: ['', Validators.required],
      vatReason: [''],
    });

    const receiverEikField = document.getElementById('receiverEik');
    const receiverVatNumberField = document.getElementById('receiverVatNumber');
    const receiverEgnField = document.getElementById('receiverEgn');

    this.invoicesForm
      .get('individualPerson')
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

    this.invoiceService.getInvoiceById(id).subscribe({
      next: (data: IInvoice) => {
        console.log('Response Data:', JSON.stringify(data)); // Print the entire response
        this.invoice = data;

        console.log('P EIK:', this.invoice.p_eik);
        console.log('P DDS Number:', this.invoice.p_ddsnumber);
        console.log('P MOL:', this.invoice.p_mol);

        this.invoicesForm.patchValue({
          // prefix: this.invoice.prefix,
          number: this.invoice.number,
          contractor: this.invoice.contractor,
          issue_date: this.invoice.issue_date,
          event_date: this.invoice.event_date,
          receiver: this.invoice.receiver,
          bank_payment: this.invoice.bank_payment,
          vatPercent: this.invoice.vat,
          vatReason: this.invoice.novatreason,
          currency: this.invoice.currency,
          rate: 1.5, //errror
          type: this.invoice.type,
          related_invoice: this.invoice.related_date,
          related_date: this.invoice.related_date,
          p_name: data.p_name,
          p_eik: this.invoice.p_eik,
          p_ddsnumber: this.invoice.p_ddsnumber,
          p_mol: 'deeemo textt',
          p_city: this.invoice.p_city,
          p_address: this.invoice.p_address,
          c_name: this.invoice.c_name,
          c_person: this.invoice.c_person,
          c_egn: this.invoice.c_egn,
          c_eik: this.invoice.c_eik,
          c_ddsnumber: this.invoice.c_ddsnumber,
          c_mol: this.invoice.c_mol,
          c_city: this.invoice.c_city,
          c_address: this.invoice.c_address,
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get invoice by id completed.');
      },
    });
  }

  // clearRows() {
  //   const rowData = this.invoicesForm.get('rowData') as FormArray;
  //   while (rowData.length !== 0) {
  //     rowData.removeAt(0);
  //   }
  // }

  addRowWithData(item: IInvoiceItems) {
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    const row = this.fb.group({
      nameField: [item.name, Validators.required],
      quantity: [item.quantity, Validators.required],
      measure: [item.measurement, Validators.required],
      priceWithoutVat: [item.price, Validators.required],
      amount: [''],
    });
    rowData.push(row);
  }
  addRow() {
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    const row = this.fb.group({
      nameField: ['', Validators.required],
      quantity: ['', Validators.required],
      measure: ['', Validators.required],
      priceWithoutVat: ['', Validators.required],
      amount: [''],
    });
    rowData.push(row);
  }

  deleteRow(index: number) {
    if (this.rowData.length > 1) {
      (this.invoicesForm.get('rowData') as FormArray).removeAt(index);
    }
  }
  calculateRowAmount(index: number): number {
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    const quantity = rowData.at(index).get('quantity')?.value;
    const priceWithoutVat = rowData.at(index).get('priceWithoutVat')?.value;
    return quantity * priceWithoutVat;
  }
  calculateTotalRowAmount(): number {
    let total = 0;
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    for (let i = 0; i < rowData.length; i++) {
      total += this.calculateRowAmount(i);
    }
    return total;
  }
  calculateTotalAmountWthVat(): number {
    return (
      (this.calculateTotalRowAmount() *
        this.invoicesForm.get('vatPercent')?.value) /
        100 +
      this.calculateTotalRowAmount()
    );
  }

  onSubmit() {
    const formData = this.invoicesForm.value;
    const dataInvoice: IInvoice = {
      prefix: 1, //-----------------???
      number: 1, //-----------------???
      contractor: 1, //----------------------????
      issue_date: formData.issuedAt,
      event_date: formData.eventAt,
      receiver: formData.receiverName,
      bank_payment: 2, //--------------???
      vat: formData.vatPercent,
      novatreason: formData.vatReason,
      currency: formData.currency,
      rate: 1.5,
      type: formData.typeOfInvoice,
      related_invoice: 'fff', //-------------??????
      related_date: new Date('2023-05-17'), //--------??
      c_name: formData.receiverName,
      c_city: formData.receiverCity,
      c_address: formData.receiverAddress,
      c_eik: formData.receiverEik,
      c_ddsnumber: formData.receiverVatNumber,
      c_mol: formData.receiverManager,
      c_person: formData.individualPerson,
      c_egn: formData.receiverEgn,
      p_name: formData.supplierName,
      p_city: formData.supplierCity,
      p_address: formData.supplierAddress,
      p_eik: formData.supplierEik,
      p_ddsnumber: formData.supplierVatNumber,
      p_mol: formData.supplierManager,
      p_bank: 'Some bank',
      p_iban: 'Some iban',
      p_bic: 'Some bic',
      p_zdds: true,
      author: 'Some author',
      author_user: 1,
      author_sign: 'Some sign',
      items: [],
    };
    const rows = formData.rowData;
    for (let i = 0; i < rows.length; i++) {
      const dataInvoicesItems: IInvoiceItems = {
        name: rows[i].nameField,
        quantity: rows[i].quantity,
        measurement: rows[i].measure,
        price: rows[i].priceWithoutVat,
      };
      dataInvoice.items.push(dataInvoicesItems); // add the new item to the items array
    }

    this.invoiceService
      .createInvoice(dataInvoice, dataInvoice.items)
      .subscribe({
        next: (response) => {
          console.log('HTTP request successful:', response);
          const successMessage = 'Invoice created successfully.';
          // Displaying success message to user
          alert(successMessage);
        },
        error: (error) => {
          console.error('Error occurred:', error);
          const errorMessage = 'Invoices creation failed. Please try again.';
          // Displaying error message to user
          alert(errorMessage);
        },
        complete: () => {
          console.log('HTTP request complete');
        },
      });
  }
}
