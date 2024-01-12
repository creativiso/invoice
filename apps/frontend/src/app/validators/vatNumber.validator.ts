import { AbstractControl, ValidatorFn } from '@angular/forms';

export function vatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Get the input value as a string
    const inputValue: string = control.value;

    // Check if the input value is empty or undefined
    if (!inputValue) {
      return null;
    }

    // Check if the input value matches the VAT number format (BG123456789)
    const vatNumberPattern = /^[A-Z]{2}\d{9}$/;
    if (!vatNumberPattern.test(inputValue)) {
      return { invalidVatNumber: true };
    }

    // The VAT number is valid
    return null;
  };
}
