import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss'],
})
export class ProformasComponent implements OnInit {
  proformasForm: FormGroup;
  //rowDataArray: FormArray;
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
  constructor(private formBuilder: FormBuilder) {
    this.proformasForm = this.formBuilder.group({
      supplierName: ['', Validators.required],
      supplierEik: ['', Validators.required],
      supplierVatNumber: [''],
      supplierManager: ['', Validators.required],
      supplierCity: ['', Validators.required],
      supplierAddress: ['', Validators.required],
      receiverName: ['', Validators.required],
      individualPerson: [false],
      receiverEik: ['', Validators.required],
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
    return;
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
    //
  }
  calculateRowAmount(): number {
    {
      //this.rowAmount = this.quantity * this.priceWithoutVat;
      return this.rowAmount;
    }
  }
  calculateTotalAmount(): number {
    // this.formArray.controls.forEach((formGroup) => {
    //const quantityControl = formGroup.get('quantity');
    // const priceWithoutVatControl = formGroup.get('priceWithoutVat');
    // this.rowAmount = quantityControl?.value * priceWithoutVatControl?.value;
    // const vatPercent = formGroup.get('vatPercent');
    //  this.totalAmount = (this.rowAmount * 20) / 100 + this.rowAmount; // instead of 20 use vatpercent
    //});

    return this.totalAmount;
  }

  onSubmit() {
    //
  }
}
