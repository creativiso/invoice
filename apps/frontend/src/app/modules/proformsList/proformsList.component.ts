import { Component, OnInit } from '@angular/core';
import { ProformsService } from '../../services/proforms.service';
import { IProform } from '../../../../../../libs/typings/src/';
import { Router } from '@angular/router';

@Component({
  selector: 'crtvs-proforms-list',
  templateUrl: './proformsList.component.html',
  styleUrls: ['./proformsList.component.scss'],
})
export class ProformsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'egn', 'mol', 'tools'];

  proforms: IProform[] = [];

  constructor(
    private router: Router,
    private proformsService: ProformsService
  ) {}
  ngOnInit(): void {
    this.proformsService.getAllProforms().subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-types
      next: (data: Object) => {
        // Change the parameter type to Object
        this.proforms = data as IProform[]; // Typecast the data to IProform[]
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get all contractors completed.');
      },
    });
  }

  editContractor(contractor: IProform) {
    this.router.navigate(['/proforms', contractor.id, 'edit'], {
      state: { data: contractor },
    });
  }
}
