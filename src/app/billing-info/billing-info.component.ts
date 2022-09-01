import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-billing-component',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css'],
})
export class BillingInfoComponent implements OnInit {
  public nestedForm: FormGroup = new FormGroup({
    basicInfo: new FormControl(),
    address: new FormControl(),
  });

  public formStatus$ = this.nestedForm.statusChanges.pipe(
    startWith(this.nestedForm.valid),
    map(x => this.nestedForm.valid)
  );

  public formErrors$ = combineLatest([this.nestedForm.valueChanges, this.nestedForm.statusChanges]).pipe(
    map(() => {
      const controlKeys = Object.keys(this.nestedForm.controls);

      const validationErrors = controlKeys.reduce((validationErrorResult, key) => {
        const controlErrors = this.nestedForm.get(key)?.errors || null;

        if(controlErrors === null) {
          return validationErrorResult;
        }

        return {
          ...validationErrorResult,
          [key]: controlErrors === null ? null : {
            ...controlErrors
          }
        };
      }, {} as ValidationErrors);

      const result = Object.keys(validationErrors).length > 0 
        ? validationErrors
        : null;

      return result;
    }),
  );

  constructor() {}

  ngOnInit() {}

  public onSubmit() {
    console.log('value: ', this.nestedForm.value, 'valid: ', this.nestedForm.valid);
  }

  public onReset() {
    this.nestedForm.reset();
  }

  public setbasicinfo() {
    this.nestedForm.get('basicInfo')!.patchValue({ fname: 'je', email: 'oma' });
  }

  public setaddress() {
    this.nestedForm.get('address')!.patchValue({ addressLine: 'je', areacode: 'moeder' })
  }

  public patch() {
    this.nestedForm.patchValue({
      basicInfo: { fname: 'je', email: 'oma' },
      address: { addressLine: 'je', areacode: 'lever' }
    })
  }

  public disable() {
    this.nestedForm.disable();
  }

  public enable() {
    this.nestedForm.enable();
  }
}
