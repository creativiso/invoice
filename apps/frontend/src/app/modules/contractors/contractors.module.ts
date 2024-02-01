import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContractorsComponent } from './contractors.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ContractorComponent } from './contractor/contractor.component';

const routes: Routes = [
  { path: '', component: ContractorsComponent },
  { path: 'new', component: ContractorComponent },
  { path: ':id', component: ContractorComponent },
];

@NgModule({
  declarations: [ContractorsComponent, ContractorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class ContractorsModule {}
