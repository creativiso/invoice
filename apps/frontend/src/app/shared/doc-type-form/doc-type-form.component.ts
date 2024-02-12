import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { ICurrency } from '../../../../../../libs/typings/src';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';

@Component({
  selector: 'crtvs-doc-type-form',
  templateUrl: './doc-type-form.component.html',
  styleUrl: './doc-type-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DocTypeFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DocTypeFormComponent,
    },
  ],
})
export class DocTypeFormComponent
  implements OnDestroy, ControlValueAccessor, Validator, OnInit
{
  docTypeForm!: FormGroup;

  showRelInvoiceInput!: boolean;

  currencyList?: ICurrency[] | null;
  selectedCurrency?: ICurrency;
  selectedCurrencyId?: number;

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    this.currenciesService
      .getAllCurrencies()
      .pipe(
        tap((res) => {
          if (res) {
            this.currencyList = res;
            this.selectedCurrency = this.currencyList[0];
            this.selectedCurrencyId = this.currencyList[0]?.id;
            console.log(this.currencyList);
          }
        }),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe();

    this.docTypeForm = this.fb.group({
      type: ['1', Validators.required],
      issue_date: [new Date(), Validators.required],
      event_date: [new Date(), Validators.required],
      related_invoice_id: ['', Validators.required],
      currency: [this.selectedCurrency?.code, Validators.required],
    });
  }

  onTouched: Function = () => {};

  onChangeSubs: Subscription[] = [];

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any) {
    const sub = this.docTypeForm.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.docTypeForm.disable();
    } else {
      this.docTypeForm.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.docTypeForm.patchValue(value, { emitEvent: true });
    }
  }

  validate(control: AbstractControl) {
    if (this.docTypeForm.valid) {
      return null;
    }

    let errors: any = {};

    errors = this.addControlErrors(errors, 'type');
    errors = this.addControlErrors(errors, 'issue_date');
    errors = this.addControlErrors(errors, 'event_date');
    errors = this.addControlErrors(errors, 'related_invoice_id');
    errors = this.addControlErrors(errors, 'currency');

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };

    const controlErrors = this.docTypeForm.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }

  onRadioChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue === '1') {
      this.showRelInvoiceInput = false;
    } else {
      this.showRelInvoiceInput = true;
    }
  }
}
