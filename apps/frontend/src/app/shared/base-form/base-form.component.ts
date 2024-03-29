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
import { Subscription } from 'rxjs';
import { egnValidator } from 'src/app/validators/egn.validator';
import { eikValidator } from 'src/app/validators/eik.validator';

@Component({
  selector: 'crtvs-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BaseFormComponent,
    },
  ],
})
export class BaseFormComponent
  implements OnDestroy, ControlValueAccessor, Validator, OnInit
{
  baseForm!: FormGroup;
  @Input()
  header: string = '';
  @Input()
  isNotSettings: boolean = true;
  isPerson?: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.baseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      eik: ['', [eikValidator()]],
      person: [],
      egn: ['', [egnValidator()]],
      dds: [''],
      mol: [
        '',
        [
          Validators.maxLength(40),
          Validators.pattern('^([A-ZА-Я][a-zа-я]*([-\\s][A-ZА-Я][a-zа-я]*)+)$'),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-ZА-Я][a-zа-я]*([-\\s][A-ZА-Я][a-zа-я]*)*$'),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
      ],
      iban: [''],
      bic_swift: [''],
      bank: [''],
      dds_percent: [''],
    });

    this.baseForm.get('person')?.valueChanges.subscribe((person) => {
      this.isPerson = person;

      this.baseForm
        .get('egn')
        ?.setValidators([
          this.isPerson ? Validators.required : Validators.nullValidator,
          egnValidator(),
        ]);
      this.baseForm
        .get('eik')
        ?.setValidators([
          !this.isPerson ? Validators.required : Validators.nullValidator,
          eikValidator(),
        ]);
      this.baseForm
        .get('mol')
        ?.setValidators([
          !this.isPerson ? Validators.required : Validators.nullValidator,
          Validators.maxLength(40),
          Validators.pattern('^([A-ZА-Я][a-zа-я]*([-\\s][A-ZА-Я][a-zа-я]*)+)$'),
        ]);

      // To ensure the field's validity state is updated after changing validators
      this.baseForm.get('egn')?.updateValueAndValidity();
      this.baseForm.get('eik')?.updateValueAndValidity();
      this.baseForm.get('mol')?.updateValueAndValidity();
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
    const sub = this.baseForm.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.baseForm.disable();
    } else {
      this.baseForm.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.baseForm.patchValue(value);
    }
  }

  validate(control: AbstractControl) {
    if (this.baseForm.valid) {
      return null;
    }

    let errors: any = {};

    errors = this.addControlErrors(errors, 'name');
    errors = this.addControlErrors(errors, 'eik');
    errors = this.addControlErrors(errors, 'dds');
    errors = this.addControlErrors(errors, 'mol');
    errors = this.addControlErrors(errors, 'egn');
    errors = this.addControlErrors(errors, 'city');
    errors = this.addControlErrors(errors, 'address');

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };

    const controlErrors = this.baseForm.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }
}
