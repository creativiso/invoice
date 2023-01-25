import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss'],
})
export class ProformasComponent {
  proformasForm: FormGroup;
  selectedMeasure = '';
  selectedCurrency = '';
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

  constructor(private formBuilder: FormBuilder) {
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
      receiverVatNumber: new FormControl(''),
      receiverManager: new FormControl('', Validators.required),
      receiverCity: new FormControl('', Validators.required),
      receiverAddress: new FormControl('', Validators.required),
      releasedAt: new FormControl('', Validators.required), //datepicker
      currency: new FormControl('', Validators.required),
      nameField: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      measure: new FormControl(''),
      priceWithoutVat: new FormControl('', Validators.required),
      vatPercent: new FormControl('', Validators.required),
      vatReason: new FormControl(''),
      wayOfPaying: new FormControl('', Validators.required),
    });
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
    //
  }
}
