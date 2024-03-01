import { AbstractControl, ValidatorFn } from '@angular/forms';

export function prefixValidator(prefixes: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const prefix = control.value;
    if (!prefix) {
      return null; // Return null for empty field
    }

    if (prefixes.includes(prefix)) {
      return {duplicatePrefix: true}
    }
    return null;
  };
}
