import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  AsyncValidatorFn,
  FormGroup,
  FormControl,
} from '@angular/forms';
export function MustMatch(password: any, confirmPassword: any) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];
    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['MustMatch']
    ) {
      return;
    }
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ MustMatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}
