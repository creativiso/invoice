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
import { SettingService } from '../../services/settings.service';
import {
  IPaymentMethod,
  ISettings,
} from '../../../../../../libs/typings/src/model/index';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { prefixValidator } from 'src/app/validators/prefix.validator';
import { MatTableDataSource } from '@angular/material/table';

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
  selectedPrefix?: any;

  paymentMethodsList: IPaymentMethod[] = [];

  prefixes!: { prefix: string; nextNum: number }[];
  prefixesCols: string[] = ['prefix', 'next_num', 'select_radio'];
  prefixesData = new MatTableDataSource<{ prefix: string; nextNum: number }>(
    this.prefixes
  );

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingService,
    private paymentMethodsService: PaymentMethodsService,
    private _snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      supplier_data: [''],
      paymentMethod: [''],
      priceInputWithVat: [''],
      quantityNumber: [''],
      singlePriceNumber: [''],
      totalPriceNumber: [''],
      units: this.fb.array([]),
      prefix: ['', [prefixValidator([]), Validators.maxLength(2)]],
      next_num: ['', [Validators.pattern('\\d{1,8}')]],
      def_prefix: ['', [Validators.required]],
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
      this.settingsForm.patchValue({
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

    this.settingsService.getPrefixes().subscribe((prefixes) => {
      this.prefixes = prefixes.filter((prefix) => prefix.id === undefined);
      this.prefixesData.data = this.prefixes;

      const defPrefixIndex = prefixes.findIndex(
        (prefix) => prefix.id !== undefined
      );
      this.settingsForm.controls['def_prefix'].setValue(
        prefixes[defPrefixIndex].id
      );

      this.settingsForm.controls['prefix'].setValidators([
        prefixValidator(prefixes),
      ]);

      this.settingsForm.controls['prefix'].updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.settingsForm.invalid) {
      const invalidFormMessage = 'Моля попъленете всички полета!';
      this.openSnackBar(invalidFormMessage);
      return;
    }
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
        const successMessage = 'Настойките са променени успешно!';
        this.openSnackBar(successMessage);
      },
      error: (error) => {
        const errorMessage =
          'Промяната на насторйките беше неуспешна. Моля опитайте отново!';
        this.openSnackBar(errorMessage);
      },
    });
  }

  addPrefix() {
    const prefixToAdd: string = this.settingsForm.value.prefix.trim();
    const nextNum: string = this.settingsForm.value.next_num.trim();
    const prefixWithNextNum = {
      prefix: prefixToAdd,
      nextNum: nextNum,
    };

    if (prefixToAdd) {
      this.settingsService.getPrefixes().subscribe((prefixes) => {
        prefixes = prefixes.map((prefix) => {
          return prefix.prefix;
        });
        this.settingsForm.controls['prefix'].setValidators([
          prefixValidator(prefixes),
        ]);

        this.settingsForm.controls['prefix'].updateValueAndValidity();

        if (this.settingsForm.get('prefix')?.valid) {
          this.settingsService.addPrefix(prefixWithNextNum).subscribe({
            next: (response) => {
              const successMessage = 'Префиксът е добавен успешно!';
              this.openSnackBar(successMessage);

              this.settingsService.getPrefixes().subscribe((prefixes) => {
                this.prefixes = prefixes.filter(
                  (prefix) => prefix.id === undefined
                );
                this.prefixesData.data = this.prefixes;
              });

              this.settingsForm.get('prefix')?.setValue('');
              this.settingsForm.get('next_num')?.setValue('');
            },
            error: (error) => {
              const errorMessage =
                'Неуспешно добавяне на префикс. Моля опитайте отново!';

              this.openSnackBar(errorMessage);
            },
          });
        }
      });
    } else {
      const errorMessage = 'Празен префикс. Моля опитайте отново!';
      this.openSnackBar(errorMessage);
    }
  }

  formatNextNumber(prefix: string, nextNum: string): string {
    const number = '00000000';
    const paddedNumber = nextNum.toString().padStart(number.length - 7, '0');
    return `${prefix}${number.slice(
      0,
      number.length - paddedNumber.length
    )}${paddedNumber}`;
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: {
        message: message,
        icon: 'close',
      },
    });
  }

  defPrefixChanged() {
    const defPrefixId = this.settingsForm.value.def_prefix;
    console.log(defPrefixId);
    const defPrefix = {
      id: defPrefixId,
    };

    this.settingsService.addPrefix(defPrefix).subscribe({
      next: (response) => {
        const successMessage = 'Префиксът по подразбиране е променен успешно!';
        this.openSnackBar(successMessage);
      },
      error: (error) => {
        const errorMessage =
          'Неуспешна промяна на префикс по подразбиране. Моля опитайте отново!';

        this.openSnackBar(errorMessage);
      },
    });
  }
}
