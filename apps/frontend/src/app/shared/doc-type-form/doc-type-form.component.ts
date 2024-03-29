import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { ICurrency } from '../../../../../../libs/typings/src';
import { Subscription } from 'rxjs';

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

  @Input()
  currencyList?: ICurrency[];
  @Input()
  selectedCurrency?: ICurrency;
  @Input()
  isInvoice!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.docTypeForm = this.fb.group({
      type: ['1', Validators.required],
      issue_date: [new Date(), Validators.required],
      event_date: [new Date(), Validators.required],
      related_invoice_num: ['', Validators.required],
      currency: [Validators.required],
    });

    this.docTypeForm
      .get('related_invoice_num')
      ?.setValidators([
        this.showRelInvoiceInput
          ? Validators.required
          : Validators.nullValidator,
      ]);
    this.docTypeForm.get('related_invoice_num')?.updateValueAndValidity();

    this.docTypeForm.get('type')?.valueChanges.subscribe((value) => {
      // Check if the form has been filled and set showRelInvoiceInput accordingly
      if (value === '1') {
        this.showRelInvoiceInput = false;
      } else {
        this.showRelInvoiceInput = true;
      }
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
    errors = this.addControlErrors(errors, 'related_invoice_num');
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
}
