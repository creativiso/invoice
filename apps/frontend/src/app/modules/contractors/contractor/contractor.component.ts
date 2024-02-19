import { Component, OnInit } from '@angular/core';
import { IContractor } from '../../../../../../../libs/typings/src';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorsService } from 'src/app/services/contractors.service';

@Component({
  selector: 'crtvs-contractor',
  templateUrl: './contractor.component.html',
  styleUrl: './contractor.component.scss',
})
export class ContractorComponent implements OnInit {
  contractor!: IContractor;
  contractorsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contractorsService: ContractorsService,
    private route: ActivatedRoute,
    private router: Router
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
      if (this.contractor) {
        // Update existing contractor
        this.contractorsService
          .updateContractor(this.contractor.id, contractorData)
          .subscribe({
            next: (res) => {
              console.log('Contractor updated successfully.', res);
              alert('Контрагентът е променен успешно!');
              this.router.navigate(['/contractors']);
            },
            error: (error) => {
              console.error('Error updating contractor:', error);
            },
          });
      } else {
        // Create new contractor
        this.contractorsService.createContractor(contractorData).subscribe({
          next: (res) => {
            console.log('Contractor created successfully.', res);
            alert('Контрагентът е успешно създаден!');
            this.router.navigate(['/contractors']);
          },
          error: (error) => {
            console.error('Error creating contractor:', error);
          },
        });
      }
    }
  }
  isFormInvalid() {
    return !this.contractorsForm.valid;
  }
}
