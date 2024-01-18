import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency } from '../../../../../libs/typings/src';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private apiUrl = 'http://localhost:3333/api/v1/currencies';

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.apiUrl}`);
  }
}
