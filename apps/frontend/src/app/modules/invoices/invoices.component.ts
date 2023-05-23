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
          console.log(' getbyID:', invoice); // Log the retrieve
          // Populate the form with the retrieved invoice data
          this.populateFormWithData(invoice);
          console.log('After method poulateformwithdataaa:---->>>  ' + invoice);
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
    console.log('Before Patch value:', invoice); // Log the invoice data

    this.invoicesForm.patchValue({
      prefix: invoice.prefix,
      number: invoice.number,
      contractor: invoice.contractor,
      issue_date: invoice.issue_date,
      event_date: invoice.event_date,
      receiver: invoice.receiver,
      bank_payment: invoice.bank_payment,
      vatPercent: invoice.vat,
      vatReason: invoice.novatreason,
      currency: this.selectedCurrency,
      rate: 1.5, //errror
      type: invoice.type,
      related_invoice: invoice.related_date,
      related_date: invoice.related_date,
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
    });

    console.log('After patch value', JSON.stringify(invoice));

    if (invoice.items) {
      const itemsArray = Array.isArray(invoice.items)
        ? invoice.items
        : [invoice.items];

      for (const item of itemsArray) {
        this.addRowWithData(item);
      }
    }
  }

  // clearRows() {
  //   const rowData = this.invoicesForm.get('rowData') as FormArray;
  //   while (rowData.length !== 0) {
  //     rowData.removeAt(0);
  //   }
  // }

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
