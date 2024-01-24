import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { SettingService } from '../../services/settings.service';
import {
  IPaymentMethod,
  ISettings,
} from '../../../../../../libs/typings/src/model/index';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PaymentMethodsService } from 'src/app/services/paymentMethods.service';

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

  initialSuggestions: string[] = ['кг', 'г', 'л', 'мл'];
  suggestedTags: string[] = [];

  paymentMethodsList: IPaymentMethod[] = [];

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingService,
    private paymentMethodsService: PaymentMethodsService
  ) {
    this.settingsForm = new FormGroup({
      supplierName: new FormControl(''),
      supplierVatNumber: new FormControl(''),
      supplierCity: new FormControl(''),
      supplierAddress: new FormControl(''),
      iban: new FormControl(''),
      bicSwift: new FormControl(''),
      bank: new FormControl(''),
      dds: new FormControl(''),
      paymentMethod: new FormControl(),
      priceInputWithVat: new FormControl(),
      quantityNumber: new FormControl(''),
      singlePriceNumber: new FormControl(''),
      totalPriceNumber: new FormControl(''),
      supplierEik: new FormControl(''),
      supplierManager: new FormControl(''),
      units: this.fb.array([]),
    });
  }

  // Add Tag
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value); // add to tags
      const unitsArray = this.settingsForm.get('units') as FormArray;
      unitsArray.push(this.fb.control(value)); // add to form
      this.removeSuggestedTag(event.value);

      // Clear the input value
      event.chipInput!.clear();
      this.tagsCtrl.setValue(null);
    }
  }

  // Remove Tag
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    const units = this.settingsForm.get('units') as FormArray;
    if (index >= 0) {
      this.tags.splice(index, 1);
      units.removeAt(index);
    }

    // Add the removed tag back to suggestedTags if it's not already there
    if (
      this.suggestedTags?.indexOf(tag) === -1 &&
      this.initialSuggestions.includes(tag)
    ) {
      this.suggestedTags?.push(tag);
    }
  }

  // Select Tag from Suggestions list
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    const unitsArray = this.settingsForm.get('units') as FormArray;
    unitsArray.push(this.fb.control(event.option.value));
    this.removeSuggestedTag(event.option.value);
  }

  // Remove Tag from Suggestions list
  removeSuggestedTag(tag: string) {
    const index = this.suggestedTags?.indexOf(tag);
    if (index !== undefined && index !== -1) {
      this.suggestedTags?.splice(index, 1);
    }
  }

  getMeasurementUnits() {
    this.settingsService.getUnits().subscribe((units) => {
      this.tags = [...units];
      const unitsArray = this.settingsForm.get('units') as FormArray;
      this.tags.forEach((tag) => unitsArray.push(this.fb.control(tag)));

      this.suggestedTags = [...this.initialSuggestions];
      const suggestedArray = this.suggestedTags?.filter(
        (item) => unitsArray.value.indexOf(item) === -1
      );
      this.suggestedTags = suggestedArray;
    });
  }

  getPaymentMethods() {
    this.paymentMethodsService
      .getAllPaymentMethods()
      .subscribe((payMethods) => {
        this.paymentMethodsList = [...payMethods];
      });
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settingsForm.setValue({
        supplierName: settings.supplierName,
        supplierVatNumber: settings.supplierVatNumber,
        supplierCity: settings.supplierCity,
        supplierAddress: settings.supplierAddress,
        iban: settings.iban,
        bicSwift: settings.bicSwift,
        bank: settings.bank,
        dds: settings.dds,
        paymentMethod: settings.paymentMethod,
        priceInputWithVat: settings.priceInputWithVat,
        quantityNumber: settings.quantityNumber,
        singlePriceNumber: settings.singlePriceNumber,
        totalPriceNumber: settings.totalPriceNumber,
        supplierEik: settings.supplierEik,
        supplierManager: settings.supplierManager,
        units: [],
      });
    });
    this.getPaymentMethods();
    this.getMeasurementUnits();
  }

  onSubmit() {
    const formData = this.settingsForm.value;
    const dataSettings: ISettings = {
      id: 1,
      supplierName: formData.supplierName,
      supplierVatNumber: formData.supplierVatNumber,
      supplierCity: formData.supplierCity,
      supplierAddress: formData.supplierAddress,
      iban: formData.iban,
      bicSwift: formData.bicSwift,
      bank: formData.bank,
      dds: formData.dds,
      paymentMethod: formData.paymentMethod,
      priceInputWithVat: formData.priceInputWithVat,
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
