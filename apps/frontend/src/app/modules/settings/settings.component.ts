import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
} from '@angular/forms';
import { SettingService } from '../../services/settings.service';
import {
  ISettings
} from '../../../../../../libs/typings/src/model/index';

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

  constructor(private fb: FormBuilder, private settingsService: SettingService) {
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
    if ((value || '').trim()) {
      this.tags.push({value: value.trim()});  
      const requirements = this.settingsForm.get('units') as FormArray;
      requirements.push(this.fb.control(value.trim()));
    }

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
    this.settingsService.getSettings().subscribe(settings => {
      this.settingsForm.setValue({
        supplierName: settings.supplierName,
        supplierVatNumber: settings.supplierVatNumber,
        supplierCity:  settings.supplierCity,
        supplierAddress: settings.supplierAddress,
        iban: settings.iban,
        bicSwift: settings.bicSwift,
        bank: settings.bank,
        dds: settings.dds,
        paymentMethod: settings.paymentMethod,
        individualPerson: settings.individualPerson,
        quantityNumber: settings.quantityNumber,
        singlePriceNumber: settings.singlePriceNumber,
        totalPriceNumber: settings.totalPriceNumber,
        supplierEik: settings.supplierEik,
        supplierManager: settings.supplierManager,
        units: [],
      });
    });
    this.settingsService.getUnits().subscribe(units => {
      const tags = units.map(unit => ({ value: unit }));
      this.tags = [...this.tags, ...tags];
      const requirements = this.settingsForm.get('units') as FormArray;
      tags.forEach(tag => requirements.push(this.fb.control(tag.value)));
    });
  }

  onSubmit() {
    const formData = this.settingsForm.value;
    const dataSettings: ISettings = {
      supplierName: formData.supplierName,
      supplierVatNumber: formData.supplierVatNumber,
      supplierCity: formData.supplierCity,
      supplierAddress: formData.supplierAddress,
      iban: formData.iban,
      bicSwift: formData.bicSwift,
      bank: formData.bank,
      dds: formData.dds,
      paymentMethod: formData.paymentMethod,
      individualPerson: formData.individualPerson,
      quantityNumber: formData.quantityNumber,
      singlePriceNumber: formData.singlePriceNumber,
      totalPriceNumber: formData.totalPriceNumber,
      supplierEik: formData.supplierEik,
      supplierManager: formData.supplierManager,
      units: formData.units,
    };
  console.log(dataSettings);
    this.settingsService.putSetting(dataSettings).subscribe({
      next: (response) => {
        console.log('HTTP request successful:', response);
        const successMessage = 'Settings updated successfully.';
        alert(successMessage);
      },
      error: (error) => {
        console.error('Error occurred:', error);
        const errorMessage = 'Settings update failed. Please try again.';
        alert(errorMessage);
      },
      complete: () => {
        console.log('HTTP request complete');
      },
    });
  }
}
  
 
