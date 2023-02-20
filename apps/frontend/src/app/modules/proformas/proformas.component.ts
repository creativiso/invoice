import { Component, OnInit } from '@angular/core';
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
    // Get the form data from the proformasForm FormGroup
    const formData = this.proformasForm.value;

    // Map the tableData array to adjust the measure and calculate the value for each item
    const tableData = this.tableData.map((data) => ({
      ...data,
      // measure: this.selectedMeasure[data.measure],
      value: data.quantity * data.priceWithoutVat,
    }));

    // Reduce the tableData array to get the total amount for all items
    const totalAmount = tableData.reduce((acc, curr) => acc + curr.value, 0);

    // Create the proforma object by combining the form data and table data
    const proforma = {
      supplier: {
        name: formData.supplierName,
        eik: formData.supplierEik,
        vatNumber: formData.supplierVatNumber,
        manager: formData.supplierManager,
        city: formData.supplierCity,
        address: formData.supplierAddress,
      },
      receiver: {
        name: formData.receiverName,
        eik: formData.receiverEik,
        vatNumber: formData.receiverVatNumber,
        manager: formData.receiverManager,
        city: formData.receiverCity,
        address: formData.receiverAddress,
      },
      releasedAt: formData.releasedAt,
      currency: formData.currency,
      items: tableData,
      totalAmount: totalAmount,
      vatReason: formData.vatReason,
      wayOfPaying: formData.wayOfPaying,
    };

    // Log the proforma object to the console for debugging purposes
    console.log(proforma);
  }
}
