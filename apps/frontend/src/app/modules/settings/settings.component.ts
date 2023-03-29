import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';


export interface Tags {
  value: string;
}

@Component({
  selector: 'crtvs-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  tagsCtrl = new FormControl();
  tags: Tags[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  visible = true;
  selectable = true;
  removable = true;

  constructor(private fb: FormBuilder) {
    this.settingsForm = new FormGroup({
      supplierName: new FormControl(''),
      supplierVatNumber: new FormControl(''),
      supplierCity: new FormControl(''),
      supplierAddress: new FormControl(''),
      iban: new FormControl(''),
      bicSwift: new FormControl(''),
      bank: new FormControl(''),
      dds: new FormControl(''),
      paymentMethod: new FormControl(''),
      individualPerson: new FormControl(''),
      quantityNumber: new FormControl(''),
      singlePriceNumber: new FormControl(''),
      totalPriceNumber: new FormControl(''),
      supplierEik: new FormControl(''),
      supplierManager: new FormControl(''),
      units: this.fb.array([]),
    });
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({value: value.trim()});  
      const requirements = this.settingsForm.get('units') as FormArray;
      requirements.push(this.fb.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);
    const units = this.settingsForm.get('units') as FormArray;
    if (index >= 0) {
      this.tags.splice(index, 1);
      units.removeAt(index);
    }
    
    
  }

  ngOnInit(): void { 
  }

  onSubmit() {
    console.log(this.settingsForm.value);
  }
}
  
 
