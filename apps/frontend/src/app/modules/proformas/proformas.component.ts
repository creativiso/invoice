import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
export interface tableElement {
  name: string;
  position: number;
  qty: number;
  measure: string;
  unitPrice: number;
  amount: number;
}

const ELEMENT_DATA: tableElement[] = [
  {
    position: 1,
    name: 'ggg',
    qty: 1,
    measure: '',
    unitPrice: 0,
    amount: 0,
  },
  {
    position: 1,
    name: 'Hydrogen',
    qty: 1.0079,
    measure: '',
    unitPrice: 0,
    amount: 0,
  },
];
@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.css'],
})
export class ProformasComponent {
  proformasForm: FormGroup;
  selected = '';
  dataSource = new MatTableDataSource<tableElement>(ELEMENT_DATA);
  tableData: FormArray;

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
      releasedAt: new FormControl(''), //datepicker
      currency: new FormControl(''),
      tableData: this.formBuilder.array([]),
    });
    this.tableData = this.proformasForm.get('tableData') as FormArray;
    this.addRow();
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'qty',
    'measure',
    'unitPrice',
    'amount',
  ];

  addRow() {
    const newRow: tableElement = {
      position: 0,
      name: '',
      qty: 0,
      measure: '',
      unitPrice: 0,
      amount: 0,
    };
    this.dataSource.data.push(newRow);
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(element: tableElement) {
    const index = this.dataSource.data.indexOf(element);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  submit() {
    console.log();
  }
}
