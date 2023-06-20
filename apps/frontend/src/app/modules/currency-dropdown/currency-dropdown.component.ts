import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crtvs-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent implements OnInit {
  @Input() selectedCurrency = ''; // Remove type annotation
  @Output() currencySelected: EventEmitter<string> = new EventEmitter<string>();
  currencies: string[] = ['BGN', 'Euro'];

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }

  onCurrencyChange(currency: string): void {
    this.currencySelected.emit(currency);
  }
}
