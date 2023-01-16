import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.css'],
})
export class ProformasComponent {
  proformasForm: FormGroup;
  individualPerson = new FormControl(false);
  //dateControl = new FormControl(new Date());
  constructor(private formBuilder: FormBuilder) {
    this.proformasForm = this.formBuilder.group({
      supplierName: [''],
      supplierEik: [''],
      supplierVatNumber: [''],
      supplierManager: [],
      supplierCity: [''],
      supplierAddress: [''],
      receiverName: [''],
      individualPerson: [false],
      receiverEik: [''],
      receiverVatNumber: [''],
      receiverManager: [],
      receiverCity: [''],
      receiverAddress: [''],
    });
  }

  submit() {
    console.log(this.proformasForm.value);
  }
}
