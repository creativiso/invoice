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
  nameField: string;
  position: number;
  qty: number;
  measure: string;
  unitPrice: number;
  amount: number;
}

const ELEMENT_DATA: tableElement[] = [
  {
    position: 1,
    nameField: '',
    qty: 1,
    measure: '',
    unitPrice: 0,
    amount: 0,
  },
  {
    position: 1,
    nameField: '',
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
      tableData: this.formBuilder.array([
        this.formBuilder.group({
          nameField: new FormControl('', Validators.required),
          position: new FormControl('', Validators.required),
          qty: new FormControl('', Validators.required),
          measure: new FormControl('', Validators.required),
          unitPrice: new FormControl('', Validators.required),
          amount: new FormControl('', Validators.required),
        }),
      ]),
      vatPercent: new FormControl(''),
      vatReason: new FormControl(''),
      wayOfPaying: new FormControl(''),
      iban: new FormControl(''),
      bicSwift: new FormControl(''),
      bankName: new FormControl(''),
    });
    this.tableData = this.proformasForm.get('tableData') as FormArray;
    this.addRow();
  }
  displayedColumns: string[] = [
    'position',
    'nameField',
    'qty',
    'measure',
    'unitPrice',
    'amount',
  ];

  addRow() {
    const newRow: tableElement = {
      position: 0,
      nameField: '',
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
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.proformasForm.value);
  }
}
