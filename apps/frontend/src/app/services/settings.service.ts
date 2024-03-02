import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { ISettings } from '../../../../../libs/typings/src/index';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private apiUrl = `${environment.apiBase}/api/v1/settings`;

  constructor(private http: HttpClient) {}

  getSettings(): Observable<ISettings> {
    return this.http.get<ISettings>(`${this.apiUrl}`);
  }

  putSetting(setting: ISettings): Observable<ISettings> {
    return this.http.put<ISettings>(`${this.apiUrl}`, setting);
  }

  getUnits(): Observable<string[]> {
    return this.http
      .get<ISettings>(`${this.apiUrl}`)
      .pipe(map((setting: ISettings) => setting.units));
  }

  getPrefixes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/prefixes`);
  }

  addPrefix(preifx: string): Observable<string[]> {
    return this.getPrefixes().pipe(
      catchError((error) => {
        throw error;
      }),
      switchMap((prefixes) => {
        prefixes.push(preifx);

        return this.http.patch<string[]>(`${this.apiUrl}/prefixes`, {
          prefixes: prefixes,
        });
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
