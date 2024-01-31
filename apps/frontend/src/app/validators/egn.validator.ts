import { AbstractControl, ValidatorFn } from '@angular/forms';

export function egnValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const egn = control.value;
    if (!egn) {
      return null; // Return null for empty field
    }
    if (egn && !/^\d{10}$/.test(egn)) {
      return { invalidEgnLength: true };
    }

    // Validate the checksum  of the 9 numbers of the EGN
    const weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    const checksum = parseInt(egn[9]);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(egn[i]);
      sum += digit * weights[i];
    }
    const remainder = sum % 11;
    const calculatedChecksum = remainder == 10 ? 0 : remainder;
    if (checksum !== calculatedChecksum) {
      return { invalidEgnChecksum: true };
    }

    return null;
  };
}
