import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ICurrency,
  IProform,
  IProformItem,
} from '../../../../../../../libs/typings/src';
import { ProformasService } from 'src/app/services/proformas.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'crtvs-proforma',
  templateUrl: './proforma.component.html',
  styleUrl: './proforma.component.scss',
})
export class ProformaComponent implements OnInit {
  proformasForm: FormGroup;

  currencyList?: ICurrency[] | null;
  selectedCurrency?: ICurrency;
  selectedCurrencyId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private proformasService: ProformasService,
    private currenciesService: CurrenciesService
  ) {
    this.proformasForm = this.formBuilder.group({
      receiver: [''],
      releasedAt: ['', Validators.required],
      currency: [this.selectedCurrency, Validators.required],
      proforma_items: [],
    });
  }

  ngOnInit() {
    this.currenciesService
      .getAllCurrencies()
      .pipe(
        tap((res) => {
          if (res) {
            this.currencyList = res;
            this.selectedCurrency = this.currencyList[0];
            this.selectedCurrencyId = this.currencyList[0]?.id;
            console.log(this.currencyList);
          }
        }),
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe();
  }
  onSubmit() {
    const formData = this.proformasForm.value;
    console.log(formData);
    const dataProform: IProform = {
      contractor: 1,
      issue_date: formData.releasedAt,
      payment_method: formData.proforma_items.wayOfPaying, //null
      vat: formData.proforma_items.vatPercent,
      novatreason: formData.proforma_items.vatReason,
      currency: formData.currency,
      rate: 1.5,
      c_name: formData.receiver.name,
      c_city: formData.receiver.city,
      c_address: formData.receiver.address,
      c_eik: formData.receiver.eik,
      c_ddsnumber: formData.receiver.dds,
      c_mol: formData.receiver.mol,
      c_person: formData.receiver.person, // boolean?
      c_egn: formData.receiver.egn,
      p_name: formData.supplierName,
      p_city: formData.supplierCity,
      p_address: formData.supplierAddress,
      p_eik: formData.supplierEik,
      p_ddsnumber: formData.supplierVatNumber,
      p_mol: formData.supplierManager,
      p_bank: 'Some bank',
      p_iban: 'Some iban',
      p_bic: 'Some bic',
      p_zdds: true,
      author: 'Some author',
      author_user: 1,
      author_sign: 'Some sign',
      items: [],
    };
    const rows = formData.proforma_items.itemData;
    for (let i = 0; i < rows.length; i++) {
      const dataProformItems: IProformItem = {
        name: rows[i].name,
        quantity: rows[i].quantity,
        measurement: rows[i].measurement,
        price: rows[i].price,
      };
      dataProform.items.push(dataProformItems); // add the new item to the items array
    }

    this.proformasService
      .createProform(dataProform, dataProform.items)
      .subscribe({
        next: (response) => {
          console.log('HTTP request successful:', response);
        },
        error: (error) => {
          console.error('Error occurred:', error);
          const errorMessage = 'Proform creation failed. Please try again.';
          // Displaying error message to user
          alert(errorMessage);
        },
        complete: () => {
          console.log('HTTP request complete');
        },
      });
  }
}
