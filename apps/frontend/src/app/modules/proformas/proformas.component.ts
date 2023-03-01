import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  IProform,
  IProformItem,
} from '../../../../../../libs/typings/src/model/index';

// interface SelectedMeasure {
//   [id: number]: string;
// }
@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss'],
})
export class ProformasComponent implements OnInit {
  proformasForm: FormGroup;
  // rowDataArray: FormArray;
  selectedCurrency = '';
  rowAmount = 0;
  totalAmount = 0;
  quantity = 0;
  priceWithoutVat = 0;
  vatPercent = 0;
  //rowData = FormArray;
  get rowData() {
    return this.proformasForm.get('rowData') as FormArray;
  }
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.proformasForm = this.formBuilder.group({
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
      releasedAt: ['', Validators.required],
      currency: ['', Validators.required],
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
    //Get the form fields
    const receiverEikField = document.getElementById('receiverEik');
    const receiverVatNumberField = document.getElementById('receiverVatNumber');
    const receiverEgnField = document.getElementById('receiverEgn');

    // Subscribe to changes in the individualPerson form control value
    this.proformasForm
      .get('individualPerson')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          // Hide the receiverEik and receiverVatNumber form fields
          receiverEikField?.classList.add('hidden');
          receiverVatNumberField?.classList.add('hidden');
          receiverEgnField?.classList.remove('hidden');
        } else {
          // Show the receiverEik and receiverVatNumber form fields
          receiverEikField?.classList.remove('hidden');
          receiverVatNumberField?.classList.remove('hidden');
          receiverEgnField?.classList.add('hidden');
        }
      });
  }
  addRow() {
    const rowData = this.proformasForm.get('rowData') as FormArray;
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
      (this.proformasForm.get('rowData') as FormArray).removeAt(index);
    }
  }
  calculateRowAmount(index: number): number {
    const rowData = this.proformasForm.get('rowData') as FormArray;
    const quantity = rowData.at(index).get('quantity')?.value;
    const priceWithoutVat = rowData.at(index).get('priceWithoutVat')?.value;
    return quantity * priceWithoutVat;
  }
  calculateTotalRowAmount(): number {
    let total = 0;
    const rowData = this.proformasForm.get('rowData') as FormArray;
    for (let i = 0; i < rowData.length; i++) {
      total += this.calculateRowAmount(i);
    }
    return total;
  }
  calculateTotalAmountWthVat(): number {
    return (
      (this.calculateTotalRowAmount() *
        this.proformasForm.get('vatPercent')?.value) /
        100 +
      this.calculateTotalRowAmount()
    );
  }

  onSubmit() {
    const formData = this.proformasForm.value;
    const dataProform: IProform = {
      contractor: 1,
      issue_date: formData.releasedAt,
      bank_payment: 12345, // payment method??
      vat: formData.vatPercent,
      novatreason: formData.vatReason,
      currency: 1,
      rate: 1.5,
      c_name: formData.receiverName,
      c_city: formData.receiverCity,
      c_address: formData.receiverAddress,
      c_eik: formData.receiverEik,
      c_ddsnumber: formData.receiverVatNumber,
      c_mol: formData.receiverManager,
      c_person: formData.individualPerson, // boolean?
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
      const dataProformItems: IProformItem = {
        //proform: 1, // set the proform field to the id of the new proform
        name: rows[i].nameField,
        quantity: rows[i].quantity,
        measurement: rows[i].measure,
        price: rows[i].priceWithoutVat,
      };
      dataProform.items.push(dataProformItems); // add the new item to the items array
    }

    this.http
      .post('http://localhost:3333/api/v1/proforms/add', dataProform)
      .subscribe({
        next: (response) => {
          console.log('HTTP request successful:', response);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        },
        complete: () => {
          console.log('HTTP request complete');
        },
      });
  }
}
