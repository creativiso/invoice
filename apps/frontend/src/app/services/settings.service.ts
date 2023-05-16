import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

  getUnits(): Observable<string[]> {
    return this.http.get<ISettings>(`${this.apiUrl}`).pipe(
      map((setting: ISettings) => setting.units)
    );
 }
}