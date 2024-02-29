import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ICurrency,
  IProform,
  IProformItem,
} from '../../../../../../../libs/typings/src';
import { ProformasService } from 'src/app/services/proformas.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { EMPTY, catchError, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'crtvs-proforma',
  templateUrl: './proforma.component.html',
  styleUrl: './proforma.component.scss',
})
export class ProformaComponent implements OnInit {
  proformasForm: FormGroup;
  proform!: IProform;
  proformId!: number;
  editMode!: boolean;
  profItems?: IProformItem[];

  currencyList?: ICurrency[];
  selectedCurrency?: ICurrency;

  constructor(
    private formBuilder: FormBuilder,
    private proformasService: ProformasService,
    private route: ActivatedRoute,
    private router: Router,
    private currenciesService: CurrenciesService,
    private _snackBar: MatSnackBar
  ) {
    this.proformasForm = this.formBuilder.group({
      receiver: [''],
      details: [''],
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
          }
        }),
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe();

    this.proformasForm.get('details')?.valueChanges.subscribe((value) => {
      this.selectedCurrency = value.currency;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.editMode = true;
      this.proformId = id;
    }

    if (this.editMode) {
      this.proformasService.getProformById(this.proformId).subscribe({
        next: (response: any) => {
          const proform: IProform = response.proformAndItems;

          this.proform = proform;

          this.profItems = proform.items;

          this.proformasForm.patchValue({
            receiver: {
              name: proform.c_name,
              person: proform.c_person,
              egn: proform.c_egn,
              eik: proform.c_eik,
              dds: proform.c_ddsnumber,
              mol: proform.c_mol,
              city: proform.c_city,
              address: proform.c_address,
            },
            details: {
              issue_date: proform.issue_date,
              currency: this.currencyList
                ? this.currencyList[proform.currency - 1]
                : this.selectedCurrency,
            },
            proforma_items: {
              vatPercent: proform.vat,
              wayOfPaying: proform.payment_method,
              vatReason: proform.novatreason,
            },
          });
        },
      });
    }
  }
  onSubmit() {
    if (this.proformasForm.invalid) {
      const message = 'Моля, въведете всички полета.';
      this.openSnackBar(message);
      return;
    }
    const formData = this.proformasForm.value;
    const dataProform: IProform = {
      contractor_id: 1,
      payment_method: formData.proforma_items.wayOfPaying, //null
      vat: formData.proforma_items.vatPercent,
      novatreason: formData.proforma_items.vatReason,
      currency: formData.details.currency.id,
      issue_date: formData.details.issue_date,
      c_name: formData.receiver.name,
      c_city: formData.receiver.city,
      c_address: formData.receiver.address,
      c_eik: formData.receiver.eik,
      c_ddsnumber: formData.receiver.dds,
      c_mol: formData.receiver.mol,
      c_person: formData.receiver.person, // boolean?
      c_egn: formData.receiver.egn,
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

    if (this.editMode) {
      // Update existing invoice
      this.proformasService
        .updateProform(this.proformId, dataProform, dataProform.items)
        .subscribe({
          next: (response) => {
            const successMessage = 'Проформата е редактирана успешно';
            // Display success message to the user
            this.openSnackBar(successMessage);
            this.router.navigate(['/proformas']);
          },
          error: (error) => {
            const errorMessage =
              'Неуспешно редактиране на проформа. Моля опитайете отново!';
            // Display error message to the user
            this.openSnackBar(errorMessage);
          },
        });
    } else {
      // Create new invoice
      this.proformasService
        .createProform(dataProform, dataProform.items)
        .subscribe({
          next: (response) => {
            const successMessage = 'Проформата е създадена успешно.';
            // Display success message to the user
            this.openSnackBar(successMessage);
            this.router.navigate(['/proformas']);

          },
          error: (error) => {
            const errorMessage =
              'Неуспешно създаване на проформа. Моля опитайте отново!';
            // Display error message to the user
            this.openSnackBar(errorMessage);
          },
        });
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
