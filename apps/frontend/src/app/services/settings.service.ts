import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { ISettings } from '../../../../../libs/typings/src/index';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = 'http://localhost:3333/api/v1/settings';

  constructor(private http: HttpClient) { }

  getSettings(): Observable<ISettings> {
    return this.http.get<ISettings >(`${this.apiUrl}`);
  }

  putSetting(setting: ISettings): Observable<ISettings> {
    return this.http.put<ISettings>(`${this.apiUrl}`, setting);
  }

  createDefaultSetting(): Observable<ISettings> {
    const defaultSetting = {
      id: 1,
      supplierName: '',
      supplierVatNumber: '',
      supplierCity: '',
      supplierAddress: '',
      iban: '',
      bicSwift: '',
      bank: '',
      dds: 20,
      paymentMethod: '',
      individualPerson: false,
      quantityNumber: 2,
      singlePriceNumber: 2,
      totalPriceNumber: 2,
      supplierEik: '',
      supplierManager: '',
      units: []
    };
    return this.http.post<ISettings>(`${this.apiUrl}`, defaultSetting);
  }

  getUnits(): Observable<string[]> {
    return this.http.get<ISettings>(`${this.apiUrl}`).pipe(
      map((setting: ISettings) => setting.units)
    );
 }
 getOrCreateSetting(): Observable<ISettings> {
  return this.getSettings().pipe(
    catchError((error) => {
      if (error.status === 404) {
        return this.createDefaultSetting();
      } else {
        throw error;
      }
    })
  );
}
}