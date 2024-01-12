import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyDropdownComponent } from './currency-dropdown.component';

@NgModule({
  declarations: [
    CurrencyDropdownComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    CurrencyDropdownComponent
  ]
})
export class CurrencyDropdownModule { }
