import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { InvoiceService } from '../../services/invoices.service';
import { IInvoice, IInvoiceItems } from 'libs/typings/src';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'crtvs-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  invoicesForm: FormGroup;
  rowAmount = 0;
  totalAmount = 0;
  quantity = 0;
  priceWithoutVat = 0;
  vatPercent = 0;
  invoice!: IInvoice;
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
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.invoicesForm = this.formBuilder.group({
      supplierName: ['', Validators.required],
      supplierEik: ['', Validators.required],
      supplierVatNumber: [''],
      supplierManager: ['', Validators.required],
      supplierCity: ['', Validators.required],
      supplierAddress: ['', Validators.required],
      receiverName: ['', Validators.required],
      individualPerson: [false],
      receiverEgn: [''],
      receiverEik: [''],
      receiverVatNumber: [''],
      receiverManager: ['', Validators.required],
      receiverCity: ['', Validators.required],
      receiverAddress: ['', Validators.required],
      typeOfInvoice: ['', Validators.required], // neww
      issuedAt: ['', Validators.required], //new
      eventAt: ['', Validators.required], //new
      currency: [this.selectedCurrency, Validators.required],
      rowData: this.formBuilder.array([
        this.formBuilder.group({
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
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      const invoiceId = Number(this.route.snapshot.paramMap.get('id'));
      console.log('Invoice ID:', invoiceId); // Log the invoice ID to verify if it's correct
      this.invoiceService.getInvoiceById(invoiceId).subscribe(
        (invoice) => {
          console.log('Retrieved invoice:', invoice); // Log the retrieve
          // Populate the form with the retrieved invoice data
          this.populateFormWithData(invoice);
        },
        (error) => {
          console.error('Error occurred while fetching invoice:', error);
          // Handle the error if necessary
        }
      );
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
  }
  populateFormWithData(invoice: IInvoice) {
    console.log('Invoice PopulateFormWith data:', invoice); // Log the invoice data

    this.invoicesForm.patchValue({
      prefix: 1,
      number: 1,
      contractor: 1,
      issuedAt: invoice.issue_date,
      eventAt: invoice.event_date,
      receiver: invoice.receiver,
      bank_payment: invoice.bank_payment,
      vatPercent: invoice.vat,
      vatReason: invoice.novatreason,
      currency: this.selectedCurrency,
      rate: 1.5, //errror
      typeOfInvoice: invoice.type,
      related_invoice: invoice.related_date,
      related_date: invoice.related_date,
      supplierName: invoice.p_name,
      supplierEik: invoice.p_eik,
      supplierVatNumber: invoice.p_ddsnumber,
      supplierManager: invoice.p_mol,
      supplierCity: invoice.p_city,
      supplierAddress: invoice.p_address,
      receiverName: invoice.c_name,
      individualPerson: invoice.c_person,
      receiverEgn: invoice.c_egn,
      receiverEik: invoice.c_eik,
      receiverVatNumber: invoice.c_ddsnumber,
      receiverManager: invoice.c_mol,
      receiverCity: invoice.c_city,
      receiverAddress: invoice.c_address,
      p_bank: invoice.p_bank,
      p_iban: invoice.p_iban,
      p_bic: invoice.p_bic,
      p_zdds: invoice.p_zdds,
      author: invoice.author,
      author_user: invoice.author_user,
      author_sign: invoice.author_sign,
      //items: [],
    });

    console.log('Form values:', this.invoicesForm.value); /// ERRRORR

    if (invoice.items) {
      const itemsArray = Array.isArray(invoice.items)
        ? invoice.items
        : [invoice.items];

      for (const item of itemsArray) {
        this.addRowWithData(item);
      }
    }
  }

  clearRows() {
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    while (rowData.length !== 0) {
      rowData.removeAt(0);
    }
  }

  addRowWithData(item: IInvoiceItems) {
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    const row = this.formBuilder.group({
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
    const row = this.formBuilder.group({
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
