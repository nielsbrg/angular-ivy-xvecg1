import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { NestedFormComponent } from 'src/app/nested-form/nested-form.component';

interface AddressFormValue {
  addressLine: string|null|undefined,
  areacode: string|null|undefined
}

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
  ],
})
export class AddressInfoComponent extends NestedFormComponent<AddressFormValue>
{
  public addressForm: FormGroup = new FormGroup({
    addressLine: new FormControl('', [Validators.required]),
    areacode: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
    ]),
  });

  protected get formGroup(): FormGroup {
    return this.addressForm;
  }
  
  protected get invalidErrorObject(): ValidationErrors {
    return {
      error: 'you were caught lacking at AddressInfoComponent'   
    };
  }

  constructor() {
    super();
  }
}
