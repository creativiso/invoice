import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

interface SelectedMeasure {
  [id: number]: string;
}
@Component({
  selector: 'crtvs-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  invoicesForm: FormGroup;
  selectedCurrency = '';
  rowAmount = 0;
  totalAmount = 0;
  quantity = 0;
  priceWithoutVat = 0;
  vatPercent = 0;

  get rowData() {
    return this.invoicesForm.get('rowData') as FormArray;
  }
  constructor(private formBuilder: FormBuilder) {
    this.invoicesForm = this.formBuilder.group({
      supplierName: ['', Validators.required],
      supplierEik: ['', Validators.required],
      supplierVatNumber: [''],
      supplierManager: ['', Validators.required],
      supplierCity: ['', Validators.required],
      supplierAddress: ['', Validators.required],
      receiverName: ['', Validators.required],
      individualPerson: [false],
      receiverEgn: [''],
      receiverEik: [''],
      receiverVatNumber: [''],
      receiverManager: ['', Validators.required],
      receiverCity: ['', Validators.required],
      receiverAddress: ['', Validators.required],
      typeOfInvoice: ['', Validators.required],
      issuedAt: ['', Validators.required],
      eventAt: ['', Validators.required],
      currency: ['', Validators.required],
      rowData: this.formBuilder.array([
        this.formBuilder.group({
          nameField: ['', Validators.required],
          quantity: ['', Validators.required],
          priceWithoutVat: ['', Validators.required],
          measure: [''],
          amount: [''],
        }),
      ]),
      vatPercent: ['', Validators.required],
      wayOfPaying: ['', Validators.required],
      vatReason: [''],
 
    });
   }
   

  ngOnInit(){
 
    const receiverEikField = document.getElementById('receiverEik');
    const receiverVatNumberField = document.getElementById('receiverVatNumber');
    const receiverEgnField = document.getElementById('receiverEgn');

    this.invoicesForm
      .get('individualPerson')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          receiverEikField?.classList.add('hidden');
          receiverVatNumberField?.classList.add('hidden');
          receiverEgnField?.classList.remove('hidden');
        } else {
          receiverEikField?.classList.remove('hidden');
          receiverVatNumberField?.classList.remove('hidden');
          receiverEgnField?.classList.add('hidden');
        }
      });
  }
  addRow() {
    const rowData = this.invoicesForm.get('rowData') as FormArray;
    const row = this.formBuilder.group({
      nameField: ['', Validators.required],
      quantity: ['', Validators.required],
      measure: ['', Validators.required],
      priceWithoutVat: ['', Validators.required],
      amount: [''],
    });
    rowData.push(row);
  }

  deleteRow(index: number) {
    if (this.rowData.length > 1) {
      (this.invoicesForm.get('rowData') as FormArray).removeAt(index);
    }
  }
    calculateRowAmount(index: number): number {
      const rowData = this.invoicesForm.get('rowData') as FormArray;
      const quantity = rowData.at(index).get('quantity')?.value;
      const priceWithoutVat = rowData.at(index).get('priceWithoutVat')?.value;
      return quantity * priceWithoutVat;
    }
    calculateTotalRowAmount(): number {
      let total = 0;
      const rowData = this.invoicesForm.get('rowData') as FormArray;
      for (let i = 0; i < rowData.length; i++) {
        total += this.calculateRowAmount(i);
      }
      return total;
    }
    calculateTotalAmountWthVat(): number {
      return (
        (this.calculateTotalRowAmount() *
          this.invoicesForm.get('vatPercent')?.value) /
          100 +
        this.calculateTotalRowAmount()
      );
    }

  onSubmit() {
    //
  }
}
