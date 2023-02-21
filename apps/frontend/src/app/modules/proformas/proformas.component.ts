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
    const formData = this.proformasForm.value;
    const dataProform = {
      contractor: 1, // <--------------------------
      issue_date: '2023-02-16T00:00:00.000Z', // <--------------------------
      bank_payment: 12345, // <--------------------------
      vat: formData.vatPercent,
      novatreason: formData.vatReason,
      currency: formData.currency,
      rate: 1.5, // <--------------------------
      c_name: formData.supplierName,
      c_city: formData.supplierCity,
      c_address: formData.supplierAddress,
      c_eik: formData.supplierEik,
      c_ddsnumber: formData.supplierVatNumber,
      c_mol: formData.supplierManager,
      c_person: 'Some person', // formData.individualPerson имаме такова поле за получател а не за доставчик
      c_egn: '123456', // нямаме такова поле
      p_name: formData.receiverName,
      p_city: formData.receiverCity,
      p_address: formData.receiverAddress,
      p_eik: formData.receiverEik,
      p_ddsnumber: formData.receiverVatNumber,
      p_mol: formData.receiverManager,
      p_bank: 'Some bank',
      p_iban: 'Some iban',
      p_bic: 'Some bic',
      p_zdds: true, // това поле също липсва
      author: 'Some author', // липсва
      author_user: 1, //липсва
      author_sign: 'Some sign', //липсва
    };

    this.http
      .post('http://localhost:3333/api/v1/proforms', dataProform)
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
    // const dataProformItems = {
    //   proform: 1, //
    //   name: formData.nameField,
    //   quantity: formData.quantity,
    //   measurement: formData.measure,
    //   price: formData.unitPrice,
    // };
    // this.http
    //   .post('http://localhost:3333/api/v1/proformitems', dataProformItems)
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response); // handle successful response
    //     },
    //     error: (error) => {
    //       console.log(error); // handle error response
    //     },
    //     complete: () => {
    //       console.log('Request completed');
    //     },
    //   });
  }
}
