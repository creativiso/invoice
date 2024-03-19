import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { ISettings } from '../../../../../libs/typings/src/index';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private apiUrl = 'http://localhost:3333/api/v1/settings';

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

  getPrefixes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prefixes`);
  }

  addPrefix(prefix: any): Observable<any[]> {
    if (!prefix.prefix && !prefix.id) {
      throw new Error();
    }

    return this.getPrefixes().pipe(
      catchError((error) => {
        throw error;
      }),
      switchMap((prefixes) => {
        if (prefix.id !== undefined) {
          const index = prefixes.findIndex((prefix) => prefix.id !== undefined);

          if (index !== -1) {
            prefixes[index].id = prefix.id;
          }
        } else if (!prefix.nextNum) {
          prefix.nextNum = 0;
          prefixes.push(prefix);
        } else {
          prefixes.push(prefix);
        }

        return this.http.patch<any[]>(`${this.apiUrl}/prefixes`, {
          prefixes: prefixes,
        });
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
