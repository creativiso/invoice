import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
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
  quantity = 0;
  priceWithoutVat = 0;
  vatPercent = 0;
  formArray: FormArray;
  public rowAmount = 0;
  public totalAmount = 0;

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
  // data = {
  //   priceWithoutVat: 0,
  //   quantity: 0,
  //   vatPercent: 0,
  // };
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
      currency: new FormControl(''),

      wayOfPaying: new FormControl(''),
      vatReason: new FormControl(''),
    });

    //this.formArray = new FormArray([this.createRow()]);
    this.formArray = this.formBuilder.array([this.createRow()]);
    this.proformasForm.addControl('tableData', this.formArray);
  }

  createRow(): FormGroup {
    return this.formBuilder.group({
      tableInfo: this.formBuilder.group({
        nameField: ['', Validators.required],
        quantity: ['', Validators.required],
        measure: [''],
        priceWithoutVat: ['', Validators.required],
        vatPercent: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    const tableData = <FormArray>this.proformasForm.get('tableData');
    tableData.valueChanges.subscribe(() => {
      this.tableData = tableData.value;
    });
  }
  addRow() {
    (<FormArray>this.proformasForm.get('tableData')).push(this.createRow());
    this.selectedMeasure[this.tableData.length - 1] = '';
  }
  deleteRow(index: number) {
    if (this.tableData.length > 1) {
      (this.proformasForm.get('tableData') as FormArray).removeAt(index);
    }
  }
  calculateRowAmount(): number {
    {
      this.rowAmount = this.quantity * this.priceWithoutVat;
      return this.rowAmount;
    }
  }
  calculateTotalAmount(): number {
    this.formArray.controls.forEach((formGroup) => {
      //const quantityControl = formGroup.get('quantity');
      // const priceWithoutVatControl = formGroup.get('priceWithoutVat');
      // this.rowAmount = quantityControl?.value * priceWithoutVatControl?.value;
      // const vatPercent = formGroup.get('vatPercent');
      //  this.totalAmount = (this.rowAmount * 20) / 100 + this.rowAmount; // instead of 20 use vatpercent
    });

    return this.totalAmount;
  }

  onSubmit() {
    //
  }
}
