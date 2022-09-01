import { Directive, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';

@Directive()
export abstract class NestedFormComponent<TFormValue>
  extends BaseComponent
  implements ControlValueAccessor, OnInit, Validator
{
  protected abstract get formGroup(): FormGroup;

  protected onTouched = () => {};
  protected onChange = (_: TFormValue) => {}

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(
      tap((value: TFormValue) => this.onChange(value)),
      this.takeUntilDestroy()
    ).subscribe();
  }

  writeValue(obj: any): void {
    if(obj === null || obj === undefined) {
      this.formGroup.reset();
    }
    else {
      this.formGroup.patchValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(change: (value: TFormValue) => void) {
    this.onChange = change;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  validate(_: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid 
      ? null 
      : this.getValidationErrors()
  }

  private getValidationErrors() {
    const validationErrors = Object.keys(this.formGroup.controls).reduce((result, key) => {
      const errors = this.formGroup.controls[key].errors;

      if(errors && Object.keys(errors).length > 0) {
        result[key] = errors;
      }

      return result;
    } , {} as ValidationErrors);

    return validationErrors;
  }
}