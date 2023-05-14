import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorsService } from 'src/app/services/contractors.service';
import { IContractor } from '../../../../../../libs/typings/src/model';
import { eikValidator } from '../../validators/eik.validator';
import { egnValidator } from '../../validators/egn.validator';
import { vatValidator } from '../../validators/vatNumber.validator';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'crtvs-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css'],
})
export class ContractorsComponent implements OnInit {
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
      name: ['', [Validators.required, Validators.minLength(2)]],
      isPerson: [false],
      eik: ['', [Validators.required, eikValidator()]],
      egn: [''],
      vatNumber: ['', vatValidator()],
      mol: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern(
            '^([A-ZА-Я][a-zа-я]*([-\\s][A-ZА-Я][a-zа-я]*)*)?$'
          ),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-ZА-Я][a-zа-я]*([-\\s][A-ZА-Я][a-zа-я]*)*$'),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.contractorsForm.get('isPerson')?.valueChanges.subscribe((isPerson) => {
      const eikControl = this.contractorsForm.get('eik');
      const egnControl = this.contractorsForm.get('egn');

      if (isPerson === true) {
        eikControl?.clearValidators();
        egnControl?.setValidators([Validators.required, egnValidator()]);
      }

      eikControl?.updateValueAndValidity();
      egnControl?.updateValueAndValidity();
    });
    const contractorEikField = document.getElementById('contractorEik');
    const contractorVatNumberField = document.getElementById(
      'contractorVatNumber'
    );
    const contractorEgnField = document.getElementById('contractorEgn');

    // Subscribe to changes in the isPerson form control value
    this.contractorsForm
      .get('isPerson')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          // Hide the Eik and VatNumber form fields
          contractorEikField?.classList.add('hidden');
          contractorVatNumberField?.classList.add('hidden');
          contractorEgnField?.classList.remove('hidden');
        } else {
          // Show the Eik and VatNumber form fields
          contractorEikField?.classList.remove('hidden');
          contractorVatNumberField?.classList.remove('hidden');
          contractorEgnField?.classList.add('hidden');
        }
      });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contractorsService.getContractorById(id).subscribe({
      next: (data: IContractor) => {
        this.contractor = data;
        this.contractorsForm.patchValue({
          name: this.contractor.name,
          isPerson: this.contractor.person,
          egn: this.contractor.egn,
          mol: this.contractor.mol,
          city: this.contractor.city,
          address: this.contractor.address,
          vatNumber: this.contractor.ddsnumber,
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
    if (this.contractorsForm.valid) {
      const contractorData = this.contractorsForm.value;
      console.log('Form data:', contractorData); // log the form data

      if (this.contractor) {
        // Update existing contractor
        this.contractorsService
          .updateContractor(this.contractor.id, contractorData)
          .subscribe({
            next: (res) => {
              console.log('Contractor updated successfully.', res);
              alert('Contractor is updated Successfully');
              this.router.navigate(['/contractorsList']);
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
            alert('Contractor is created Successfully');
            this.router.navigate(['/contractorsList']);
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
