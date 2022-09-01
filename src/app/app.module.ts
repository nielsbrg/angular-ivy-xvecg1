import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddressInfoComponent } from 'src/app/address-info/address-info.component';
import { BasicInfoComponent } from 'src/app/basic-info/basic-info.component';
import { BillingInfoComponent } from 'src/app/billing-info/billing-info.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingInfoComponent,
    BasicInfoComponent,
    AddressInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
