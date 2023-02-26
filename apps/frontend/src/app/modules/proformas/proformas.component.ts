import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
interface SelectedMeasure {
  [id: number]: string;
}
@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss'],
})
export class ProformasComponent implements OnInit {
  proformasForm: FormGroup;
  selectedMeasure: SelectedMeasure = {};
  selectedCurrency = '';
  quantity = 0.0;
  priceWithoutVat = 0.0;
  vatPercent = 0;

  tableData: {
    nameField: string;
    quantity: number;
    measure: string;
    priceWithoutVat: number;
    value: number;
  }[] = [
    {
      nameField: '',
      quantity: 0,
      measure: '',
      priceWithoutVat: 0.0,
      value: 0.0,
    },
  ];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.proformasForm = new FormGroup({
      supplierName: new FormControl('', Validators.required),
      supplierEik: new FormControl('', Validators.required),
      supplierVatNumber: new FormControl(''),
      supplierManager: new FormControl('', Validators.required),
      supplierCity: new FormControl('', Validators.required),
      supplierAddress: new FormControl('', Validators.required),
      receiverName: new FormControl('', Validators.required),
      individualPerson: new FormControl(false),
      receiverEik: new FormControl('', Validators.required),
      receiverEgn: new FormControl('', Validators.required),
      receiverVatNumber: new FormControl(''),
      receiverManager: new FormControl('', Validators.required),
      receiverCity: new FormControl('', Validators.required),
      receiverAddress: new FormControl('', Validators.required),
      releasedAt: new FormControl('', Validators.required), //datepicker
      currency: new FormControl(''),
      nameField: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      measure: new FormControl(''),
      priceWithoutVat: new FormControl('', Validators.required),
      vatPercent: new FormControl('', Validators.required),
      vatReason: new FormControl(''),
      wayOfPaying: new FormControl('', Validators.required),
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
    this.proformasForm.get('vatPercent')?.valueChanges.subscribe((value) => {
      this.vatPercent = value;
    });
    this.proformasForm.get('quantity')?.valueChanges.subscribe((value) => {
      this.quantity = value;
    });
    this.proformasForm
      .get('priceWithoutVat')
      ?.valueChanges.subscribe((value) => {
        this.priceWithoutVat = value;
      });
  }
  //geting the sum of quntity and unitPrice
  get amount(): number {
    return this.quantity * this.priceWithoutVat;
  }
  get totalAmount(): number {
    return (this.amount * this.vatPercent) / 100 + this.amount;
  }
  addRow() {
    const newRow = {
      nameField: '',
      quantity: 0,
      measure: '',
      priceWithoutVat: 0.0,
      value: 0.0,
    };
    this.tableData.push(newRow);
    this.selectedMeasure[this.tableData.length - 1] = '';
  }
  deleteRow(index: number) {
    if (this.tableData.length > 1) {
      this.tableData.splice(index, 1);
    } else {
      // code to show an error message or alert
      console.log('You should have at least one row');
    }
  }

  onSubmit() {
    const formData = this.proformasForm.value;
    const dataProform = {
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
    };

    this.http
      .post('http://localhost:3333/api/v1/proforms/add', dataProform)
      .subscribe({
        next: (response) => {
          console.log(response); // handle successful response
        },
        error: (error) => {
          console.log(error); // handle error response
        },
        complete: () => {
          console.log('Request completed');
        },
      });

    const dataProformItems = {
      proform: 1, // link to proform id
      name: formData.nameField,
      quantity: formData.quantity,
      measurement: formData.measure,
      price: formData.priceWithoutVat,
    };
    console.log(
      formData.nameField,
      formData.quantity,
      formData.measure,
      formData.priceWithoutVat
    );
    this.http
      .post(
        'http://localhost:3333/api/v1/proformitems//:id/items',
        dataProformItems
      )
      .subscribe({
        next: (response) => {
          console.log(response); // handle successful response
        },
        error: (error) => {
          console.log(error); // handle error response
        },
        complete: () => {
          console.log('Request completed');
        },
      });
  }
}
