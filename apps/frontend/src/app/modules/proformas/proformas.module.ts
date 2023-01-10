import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProformasComponent } from './proformas.component';


const routes: Routes = [
  { path: '', component: ProformasComponent }
];

@NgModule({
  declarations: [
    ProformasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProformasModule { }
