import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProform, IProformItem } from '../../../../../libs/typings/src/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProformasService {
  private apiUrl = `${environment.apiBase}/api/v1/proforms`;

  constructor(private http: HttpClient) {}

  createProform(proformData: IProform, items: IProformItem[]) {
    const proformItems = items.map((item) => ({
      ...item,
      proform: proformData.id,
    }));
    const data = {
      ...proformData,
      items: proformItems,
    };
    return this.http.post(`${this.apiUrl}/add`, data);
  }
  updateProform(
    proformId: number,
    proformData: IProform,
    items: IProformItem[]
  ) {
    const proformItems = items.map((item) => ({
      ...item,
      proform: proformData.id,
    }));
    const data = {
      ...proformData,
      items: proformItems,
    };
    return this.http.put(`${this.apiUrl}/${proformId}`, data);
  }
  getAllProforms(): Observable<IProform[]> {
    return this.http.get<IProform[]>(`${this.apiUrl}/`);
  }

  getProformById(proformId: number): Observable<IProform> {
    return this.http.get<IProform>(`${this.apiUrl}/${proformId}`);
  }
}
