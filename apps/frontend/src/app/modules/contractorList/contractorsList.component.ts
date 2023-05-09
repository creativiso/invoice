import { Component, OnInit } from '@angular/core';
import { ContractorsService } from 'src/app/services/contractors.service';
import { IContractor } from '../../../../../../libs/typings/src';

@Component({
  selector: 'crtvs-contractors-list',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.scss'],
})
export class ContractorListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  contractors: IContractor[] = [];

  constructor(private contractorsService: ContractorsService) {}
  ngOnInit(): void {
    this.contractorsService.getAllContractors().subscribe(
      (data: IContractor[]) => {
        this.contractors = data;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        console.error(error);
      }
    );
  }
}
