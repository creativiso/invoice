import { Component, OnInit, ViewChild } from '@angular/core';
import { IProform, IProformItem } from '../../../../../../libs/typings/src';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProformsService } from 'src/app/services/proforms.service';

@Component({
  selector: 'crtvs-proformas-list',
  templateUrl: './proformasList.component.html',
  styleUrls: ['./proformasList.component.scss'],
})
export class ProformasListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'date', 'amount', 'tools'];

  proformas: IProform[] = [];
  item!: IProformItem;
  dataSource = new MatTableDataSource<IProform>(this.proformas);
  constructor(
    private router: Router,
    private proformasService: ProformsService
  ) {}
  ngOnInit(): void {
    this.proformasService.getAllProforms().subscribe({
      next: (data: IProform[]) => {
        this.proformas = data;
        this.dataSource.data = this.proformas;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all Proformas completed.');
      },
    });
  }

  editProforma(proforma: IProform) {
    this.router.navigate(['/proforma', proforma.id], {
      state: { data: { proforma } },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
