import { Component, OnInit } from '@angular/core';
import { ContractorsService } from 'src/app/services/contractors.service';
import { IContractor } from '../../../../../../libs/typings/src';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'crtvs-contractors-list',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.scss'],
})
export class ContractorListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  contractors: IContractor[] = [];
  dataSource = new MatTableDataSource<IContractor>(this.contractors);
  constructor(
    private router: Router,
    private contractorsService: ContractorsService
  ) {}
  ngOnInit(): void {
    this.contractorsService.getAllContractors().subscribe({
      next: (data: IContractor[]) => {
        this.contractors = data;
        this.dataSource.data = this.contractors;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all contractors completed.');
      },
    });
  }

  editContractor(contractor: IContractor) {
    this.router.navigate(['/contractors', contractor.id, 'edit'], {
      state: { data: contractor },
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
