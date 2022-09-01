import { Component, forwardRef } from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NestedFormComponent } from 'src/app/nested-form/nested-form.component';

interface BasicInfoValue {
  fname: string | null | undefined;
  email: string | null | undefined;
}

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BasicInfoComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BasicInfoComponent,
      multi: true,
    },
  ],
})
export class BasicInfoComponent extends NestedFormComponent<BasicInfoValue>
{
  public basicInfoForm: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  protected get formGroup(): FormGroup {
    return this.basicInfoForm;
  }

  constructor() {
    super()
  }
}
