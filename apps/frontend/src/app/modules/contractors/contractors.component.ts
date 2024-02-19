import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContractor } from '../../../../../../libs/typings/src/model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContractorsService } from 'src/app/services/contractors.service';

@Component({
  selector: 'crtvs-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss'],
})
export class ContractorsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  contractors: IContractor[] = [];
  dataSource = new MatTableDataSource<IContractor>(this.contractors);
  constructor(
    private router: Router,
    private contractorsService: ContractorsService,
    private path: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.contractorsService.getAllContractors().subscribe({
      next: (data: IContractor[]) => {
        this.contractors = data;
        this.dataSource.data = this.contractors;
      },
    });
  }

  editContractor(contractor: IContractor) {
    this.router.navigate([contractor.id], {
      relativeTo: this.path,
      state: { data: contractor },
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
