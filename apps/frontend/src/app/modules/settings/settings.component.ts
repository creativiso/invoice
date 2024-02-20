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
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';

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
    this.settingsForm = this.fb.group({
      supplier_data: [''],
      paymentMethod: [''],
      priceInputWithVat: [''],
      quantityNumber: [''],
      singlePriceNumber: [''],
      totalPriceNumber: [''],
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
        supplier_data: {
          name: settings.supplierName,
          eik: settings.supplierEik,
          dds: settings.supplierVatNumber,
          mol: settings.supplierManager,
          city: settings.supplierCity,
          address: settings.supplierAddress,
          iban: settings.iban,
          bic_swift: settings.bicSwift,
          bank: settings.bank,
          dds_percent: settings.dds,
          person: false,
          egn: '',
        },
        paymentMethod: settings.paymentMethod,
        priceInputWithVat: settings.priceInputWithVat,
        quantityNumber: settings.quantityNumber,
        singlePriceNumber: settings.singlePriceNumber,
        totalPriceNumber: settings.totalPriceNumber,
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
      supplierName: formData.supplier_data.name,
      supplierVatNumber: formData.supplier_data.dds,
      supplierCity: formData.supplier_data.city,
      supplierAddress: formData.supplier_data.address,
      supplierEik: formData.supplier_data.eik,
      supplierManager: formData.supplier_data.mol,
      iban: formData.supplier_data.iban,
      bicSwift: formData.supplier_data.bic_swift,
      bank: formData.supplier_data.bank,
      dds: formData.supplier_data.dds_percent,
      paymentMethod: formData.paymentMethod,
      priceInputWithVat: formData.priceInputWithVat,
      quantityNumber: formData.quantityNumber,
      singlePriceNumber: formData.singlePriceNumber,
      totalPriceNumber: formData.totalPriceNumber,
      units: formData.units,
    };
    this.settingsService.putSetting(dataSettings).subscribe({
      next: (response) => {
        const successMessage = 'Settings updated successfully.';
        alert(successMessage);
      },
      error: (error) => {
        const errorMessage = 'Settings update failed. Please try again.';
        alert(errorMessage);
      },
    });
  }
}
