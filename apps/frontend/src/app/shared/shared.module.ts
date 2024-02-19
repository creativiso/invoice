import { NgModule } from '@angular/core';
import { BaseFormComponent } from './base-form/base-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseFormItemsComponent } from './base-form-items/base-form-items.component';
import { NumberFormatterDirective } from './directives/number-formatter.directive';
import { DocTypeFormComponent } from './doc-type-form/doc-type-form.component';

@NgModule({
  declarations: [
    BaseFormComponent,
    BaseFormItemsComponent,
    DocTypeFormComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'bg-BG' }],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    NumberFormatterDirective,
  ],
  exports: [BaseFormComponent, BaseFormItemsComponent, DocTypeFormComponent],
})
export class SharedModule {}
