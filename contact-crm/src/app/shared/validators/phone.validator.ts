import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validates phone numbers. Returns null if the field is empty (optional field).
 * Accepts formats: +33 6 12 34 56 78 | 06 12 34 56 78 | +1-555-123-4567
 */
export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string | null)?.trim();
  if (!value) return null;
  const pattern = /^[+\d][\d\s\-().]{6,29}$/;
  return pattern.test(value) ? null : { invalidPhone: true };
}
