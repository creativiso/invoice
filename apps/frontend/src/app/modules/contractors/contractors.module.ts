import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContractorsComponent } from './contractors.component';


const routes: Routes = [
  { path: '', component: ContractorsComponent }
];

@NgModule({
  declarations: [
    ContractorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContractorsModule { }
