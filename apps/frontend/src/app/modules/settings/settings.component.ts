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


@Component({
  selector: 'crtvs-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  tagsCtrl = new FormControl();
  tags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  
  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      supplierName: [''],
      supplierVatNumber: [''],
      supplierCity: [''],
      supplierAddress: [''],
      iban: [''],
      bicSwift: [''],
      bank: [''],
      dds: [''],
      paymentMethod: [''],
      individualPerson: [''],
      quantityNumber: [''],
      singlePriceNumber: [''],
      totalPriceNumber: [''],
      supplierEik: [''],
      supplierManager: [''],
      tags: this.fb.array([]),
    });
  }

 addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.tagsCtrl.setValue('');
      const tagsFormArray = this.settingsForm.get('tags') as FormArray;
      tagsFormArray.push(this.fb.control(value));
    }
  }
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.tags);
  }
}
