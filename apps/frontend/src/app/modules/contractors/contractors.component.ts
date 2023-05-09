import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractorsService } from 'src/app/services/contractors.service';

@Component({
  selector: 'crtvs-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css'],
})
export class ContractorsComponent implements OnInit {
  contractorsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contractorsService: ContractorsService
  ) {
    //
  }
  ngOnInit() {
    const contractorEikField = document.getElementById('contractorEik');
    const contractorVatNumberField = document.getElementById(
      'contractorVatNumber'
    );
    const contractorEgnField = document.getElementById('contractorEgn');

    this.contractorsForm = this.fb.group({
      contractorName: ['', Validators.required],
      isPerson: [false],
      contractorEik: [''],
      contractorEgn: [''],
      contractorVatNumber: [''],
      contractorMol: ['', Validators.required],
      contractorCity: ['', Validators.required],
      contractorAddress: ['', Validators.required],
    });

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
  }
  onSubmit() {
    const contractorData = this.contractorsForm.value;
    this.contractorsService.createContractor(contractorData).subscribe(
      (res) => {
        console.log('Contractor created successfully.');
        // Reset the form
        //this.contractorsForm.reset();
      },
      (error) => {
        console.error('Error creating contractor:', error);
      }
    );
  }
}
