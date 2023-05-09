import { Component, OnInit } from '@angular/core';
import { ContractorsService } from 'src/app/services/contractors.service';
import { IContractor } from '../../../../../../libs/typings/src';

@Component({
  selector: 'crtvs-contractors-list',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.scss'],
})
export class ContractorListComponent {
  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  contractors: IContractor[] = [];

  constructor(private contractorsService: ContractorsService) {}
}
