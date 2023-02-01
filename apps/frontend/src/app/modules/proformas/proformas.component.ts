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
    if (this.rowData.length > 1) {
      (this.proformasForm.get('rowData') as FormArray).removeAt(index);
    }
  }
  calculateRowAmount(index: number): number {
    const rowData = this.proformasForm.get('rowData') as FormArray;
    const quantity = rowData.at(index).get('quantity').value;
    const priceWithoutVat = rowData.at(index).get('priceWithoutVat').value;
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
        this.proformasForm.get('vatPercent').value) /
        100 +
      this.calculateTotalRowAmount()
    );
  }

  onSubmit() {
    //
  }
}
