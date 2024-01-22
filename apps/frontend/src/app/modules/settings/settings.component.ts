import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { SettingService } from '../../services/settings.service';
import { ISettings } from '../../../../../../libs/typings/src/model/index';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

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

  @ViewChild('fruitInput') tagInput!: ElementRef<HTMLInputElement>;
  allTags: string[] = ['кг', 'г'];
  filteredTags?: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingService
  ) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );

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
      priceInputWithVat: new FormControl(false),
      quantityNumber: new FormControl(''),
      singlePriceNumber: new FormControl(''),
      totalPriceNumber: new FormControl(''),
      supplierEik: new FormControl(''),
      supplierManager: new FormControl(''),
      units: this.fb.array([]),
    });
  }

  add(event: MatChipInputEvent): void {
    // const input = event.input;
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
      const requirements = this.settingsForm.get('units') as FormArray;
      requirements.push(this.fb.control(value.trim()));

      // Clear the input value
      event.chipInput!.clear();
      this.tagsCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    const units = this.settingsForm.get('units') as FormArray;
    if (index >= 0) {
      this.tags.splice(index, 1);
      units.removeAt(index);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.tagInput = new ElementRef<HTMLInputElement>(
      document.createElement('input')
    );
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
    this.settingsService.getUnits().subscribe((units) => {
      // const tags = units.map((unit) => unit);
      const tags = [...units];
      this.tags = [...this.tags, ...tags];
      const requirements = this.settingsForm.get('units') as FormArray;
      tags.forEach((tag) => requirements.push(this.fb.control(tag)));
    });
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
