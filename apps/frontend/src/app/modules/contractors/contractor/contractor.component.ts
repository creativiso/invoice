import { Component, OnInit } from '@angular/core';
import { IContractor } from '../../../../../../../libs/typings/src';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorsService } from 'src/app/services/contractors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'crtvs-contractor',
  templateUrl: './contractor.component.html',
  styleUrl: './contractor.component.scss',
})
export class ContractorComponent implements OnInit {
  contractor!: IContractor;
  contractorsForm!: FormGroup;
  editMode!: boolean;
  constructor(
    private fb: FormBuilder,
    private contractorsService: ContractorsService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    //
  }
  ngOnInit() {
    this.contractorsForm = this.fb.group({
      contractor: [''],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contractorsService.getContractorById(id).subscribe({
      next: (data: IContractor) => {
        this.contractor = data;
        this.editMode = true;
        this.contractorsForm.patchValue({
          contractor: {
            name: this.contractor.name,
            person: this.contractor.person,
            eik: this.contractor.eik,
            ddsnumber: this.contractor.ddsnumber,
            egn: this.contractor.egn,
            mol: this.contractor.mol,
            city: this.contractor.city,
            address: this.contractor.address,
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Get contractor by id completed.');
      },
    });
  }
  onSubmit() {
    const contractorData = this.contractorsForm.value.contractor;
    if (this.contractorsForm.valid) {
      if (this.editMode) {
        // Update existing contractor
        this.contractorsService
          .updateContractor(this.contractor.id, contractorData)
          .subscribe({
            next: (res) => {
              const successMessage = 'Контрагентът е редактиран успешно!';
              this.openSnackBar(successMessage);
              this.router.navigate(['/contractors']);
            },
            error: (error) => {
              const errorMessage =
                'Неуспешно редактиране на контрагент. Моля опитайте отново!';
              this.openSnackBar(errorMessage);
            },
          });
      } else {
        // Create new contractor
        this.contractorsService.createContractor(contractorData).subscribe({
          next: (res) => {
            const successMessage = 'Контрагентът е създаден успешно!';
            this.openSnackBar(successMessage);
            this.router.navigate(['/contractors']);
          },
          error: (error) => {
            const errorMessage =
              'Неуспешно създаване на контрагент. Моля опитайте отново!';
            this.openSnackBar(errorMessage);
          },
        });
      }
    } else {
      const invalidFormMessage = 'Моля попълнете всички полета!';
      this.openSnackBar(invalidFormMessage);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: {
        message: message,
        icon: 'close',
      },
    });
  }
}
