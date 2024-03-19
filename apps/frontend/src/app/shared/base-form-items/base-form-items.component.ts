import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';
import {
  ICurrency,
  IInvoiceItems,
  IPaymentMethod,
  IProformItem,
} from '../../../../../../libs/typings/src';
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';
import { SettingService } from 'src/app/services/settings.service';

@Component({
  selector: 'crtvs-base-form-items',
  templateUrl: './base-form-items.component.html',
  styleUrl: './base-form-items.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseFormItemsComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BaseFormItemsComponent,
    },
  ],
})
export class BaseFormItemsComponent
  implements OnDestroy, ControlValueAccessor, Validator, OnInit, OnChanges
{
  @Input()
  selectedCurrency?: ICurrency;
  @Input()
  number?: number;
  @Input()
  items?: IInvoiceItems[] | IProformItem[];

  private numberRegex!: RegExp;

  baseFormItems!: FormGroup;
  get itemData() {
    return this.baseFormItems.get('itemData') as FormArray;
  }

  paymentMethods?: IPaymentMethod[] | null;
  selectedPaymentMethodId?: number;

  units?: string[];

  quantityFormat: number = 2;
  singlePriceFormat: number = 2;
  totalPriceFormat: number = 2;

  constructor(
    private fb: FormBuilder,
    private paymentMethodsService: PaymentMethodsService,
    private settingsService: SettingService
  ) {}

  ngOnInit(): void {
    this.numberRegex = new RegExp('^[0-9]+(?:.[0-9]+)?$');

    this.baseFormItems = this.fb.group({
      itemData: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          quantity: [
            0,
            [Validators.required, Validators.pattern(this.numberRegex)],
          ],
          price: [
            0,
            [Validators.required, Validators.pattern(this.numberRegex)],
          ],
          measurement: [''],
          amount: ['', Validators.pattern(this.numberRegex)],
        }),
      ]),
      vatPercent: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      wayOfPaying: ['', Validators.required],
      vatReason: ['', [Validators.minLength(4), Validators.maxLength(40)]],
      receiver: ['', [Validators.required]],
    });

    this.paymentMethodsService
      .getAllPaymentMethods()
      .pipe(
        tap((res) => {
          if (res) {
            this.paymentMethods = res;
          }
        }),
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe();

    this.settingsService
      .getSettings()
      .pipe(
        tap((res) => {
          if (res) {
            this.units = res.units;
            this.quantityFormat = res.quantityNumber;
            this.singlePriceFormat = res.singlePriceNumber;
            this.totalPriceFormat = res.totalPriceNumber;

            if (!this.baseFormItems.get('vatPercent')?.value) {
              this.baseFormItems.patchValue({
                vatPercent: res.dds,
              });
            }

            if (!this.baseFormItems.get('wayOfPaying')?.value) {
              this.baseFormItems.patchValue({
                wayOfPaying: res.paymentMethod,
              });
            }
          }
        }),
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      if (this.items) {
        for (let index = 0; index < this.items.length - 1; index++) {
          this.addRow();
        }
        const items = this.baseFormItems.get('itemData') as FormArray;
        items.patchValue(this.items);
      }
    }
  }

  onTouched: Function = () => {};

  onChangeSubs: Subscription[] = [];

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any) {
    const sub = this.baseFormItems.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.baseFormItems.disable();
    } else {
      this.baseFormItems.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.baseFormItems.patchValue(value, { emitEvent: true });
    }
  }

  validate(control: AbstractControl) {
    if (this.baseFormItems.valid) {
      return null;
    }

    let errors: any = {};

    errors = this.addControlErrors(errors, 'vatPercent');
    errors = this.addControlErrors(errors, 'wayOfPaying');
    errors = this.addControlErrors(errors, 'vatReason');
    errors = this.addControlErrors(errors, 'receiver');

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };

    const controlErrors = this.baseFormItems.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }

  addRow(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    const itemData = this.baseFormItems.get('itemData') as FormArray;
    const row = this.fb.group({
      name: ['', Validators.required],
      quantity: [
        '',
        [Validators.required, Validators.pattern(this.numberRegex)],
      ],
      price: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      measurement: [''],
      amount: ['', Validators.pattern(this.numberRegex)],
    });
    itemData.push(row);
  }

  deleteRow(index: number) {
    if (this.itemData.length > 1) {
      (this.baseFormItems.get('itemData') as FormArray).removeAt(index);
    }
  }
  calculateRowAmount(index: number): number {
    const itemData = this.baseFormItems.get('itemData') as FormArray;
    const quantity = itemData.at(index).get('quantity')?.value;
    const priceWithoutVat = itemData.at(index).get('price')?.value;
    return quantity * priceWithoutVat;
  }
  calculateTotalRowAmount(): number {
    let total = 0;
    const itemData = this.baseFormItems.get('itemData') as FormArray;
    for (let i = 0; i < itemData.length; i++) {
      total += this.calculateRowAmount(i);
    }
    return total;
  }
  calculateTotalAmountWthVat(): number {
    return (
      (this.calculateTotalRowAmount() *
        this.baseFormItems.get('vatPercent')?.value) /
        100 +
      this.calculateTotalRowAmount()
    );
  }
  formatNumber(decimalPlaces: number): string {
    return `1.${decimalPlaces}-${decimalPlaces}`;
  }
}
