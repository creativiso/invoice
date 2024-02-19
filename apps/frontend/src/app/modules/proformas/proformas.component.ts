import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  IProform,
  IProformItem,
} from '../../../../../../libs/typings/src/model/index';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProformasService } from 'src/app/services/proformas.service';

@Component({
  selector: 'crtvs-proformas',
  templateUrl: './proformas.component.html',
  styleUrls: ['./proformas.component.scss'],
})
export class ProformasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'date', 'amount', 'tools'];

  proformas: IProform[] = [];
  item!: IProformItem;
  dataSource = new MatTableDataSource<IProform>(this.proformas);
  constructor(
    private router: Router,
    private proformasService: ProformasService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.proformasService.getAllProforms().subscribe({
      next: (data: IProform[]) => {
        this.proformas = data;
        this.dataSource.data = this.proformas;
      },
    });
  }

  editProforma(proforma: IProform) {
    this.router.navigate([proforma.id], {
      relativeTo: this.route,
      state: { data: { proforma } },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
