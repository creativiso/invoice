import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';


const routes: Routes = [
  { path: '', component: InvoicesComponent }
];

@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoicesModule { }
