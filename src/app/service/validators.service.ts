import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!control.value || urlPattern.test(control.value)) {
      return null; // Return null if the input is valid
    } else {
      return {'invalidUrl': {value: control.value}}; // Return an error object if the input is invalid
    }
  };
}
