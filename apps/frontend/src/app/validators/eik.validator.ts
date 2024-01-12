import { AbstractControl, ValidatorFn } from '@angular/forms';

export function eikValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const eik = control.value;
    if (eik && !/^\d{9}$|^\d{13}$/.test(eik)) {
      return { invalidEik: true };
    }
    return null;
  };
}
