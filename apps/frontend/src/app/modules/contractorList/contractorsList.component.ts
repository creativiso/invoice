import { Component, OnInit } from '@angular/core';
import { ContractorsService } from 'src/app/services/contractors.service';
import { IContractor } from '../../../../../../libs/typings/src';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'crtvs-contractors-list',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.scss'],
})
export class ContractorListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  contractors: IContractor[] = [];

  constructor(
    private route: ActivatedRoute,
    private contractorsService: ContractorsService
  ) {}
  ngOnInit(): void {
    this.contractorsService.getAllContractors().subscribe({
      next: (data: IContractor[]) => {
        this.contractors = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all contractors completed.');
      },
    });
  }

  deleteContractor(contractor: IContractor) {
    this.contractorsService.deleteContractor(contractor.id).subscribe({
      next: () => {
        // Remove the deleted contractor from the array
        const index = this.contractors.indexOf(contractor);
        if (index !== -1) {
          this.contractors.splice(index, 1);
          location.reload();
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Delete contractor completed.');
      },
    });
  }
}
