import { Component, OnInit } from '@angular/core';
import { IContractor } from '../../../../../../../libs/typings/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorsService } from 'src/app/services/contractors.service';
import { eikValidator } from 'src/app/validators/eik.validator';
import { egnValidator } from 'src/app/validators/egn.validator';

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
      name: ['', [Validators.required, Validators.minLength(2)]],
      person: [false],
      eik: ['', [Validators.required, eikValidator()]],
      egn: [''],
      ddsumber: [''],
      mol: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern(
            '^(?:[A-Za-z]+|[А-ЯЁа-яё]+)(?: [A-Za-z]+|[А-ЯЁа-яё]+)+$'
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
    this.contractorsForm.get('person')?.valueChanges.subscribe((person) => {
      const eikControl = this.contractorsForm.get('eik');
      const egnControl = this.contractorsForm.get('egn');
      const molControl = this.contractorsForm.get('mol');

      if (person) {
        eikControl?.clearValidators();
        molControl?.clearValidators();
        egnControl?.setValidators([Validators.required, egnValidator()]);
      } else {
        molControl?.setValidators([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern(
            '^(?:[A-Za-z]+|[А-ЯЁа-яё]+)(?: [A-Za-z]+|[А-ЯЁа-яё]+)+$'
          ),
        ]);
        eikControl?.setValidators([Validators.required, eikValidator()]);
        egnControl?.clearValidators();
      }
      eikControl?.updateValueAndValidity();
      egnControl?.updateValueAndValidity();
      molControl?.updateValueAndValidity();
    });
    const contractorEikField = document.getElementById('contractorEik');
    const contractorVatNumberField = document.getElementById(
      'contractorVatNumber'
    );
    const contractorEgnField = document.getElementById('contractorEgn');
    const contractorMolField = document.getElementById('contractorMol');

    // Subscribe to changes in the isPerson form control value
    this.contractorsForm
      .get('person')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          // Hide the Eik and VatNumber form fields
          contractorEikField?.classList.add('hidden');
          contractorVatNumberField?.classList.add('hidden');
          contractorMolField?.classList.add('hidden');
          contractorEgnField?.classList.remove('hidden');
        } else {
          // Show the Eik and VatNumber form fields
          contractorEikField?.classList.remove('hidden');
          contractorVatNumberField?.classList.remove('hidden');
          contractorMolField?.classList.remove('hidden');
          contractorEgnField?.classList.add('hidden');
        }
      });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contractorsService.getContractorById(id).subscribe({
      next: (data: IContractor) => {
        this.contractor = data;
        this.contractorsForm.patchValue({
          name: this.contractor.name,
          person: this.contractor.person,
          eik: this.contractor.eik,
          ddsnumber: this.contractor.ddsnumber,
          egn: this.contractor.egn,
          mol: this.contractor.mol,
          city: this.contractor.city,
          address: this.contractor.address,
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
