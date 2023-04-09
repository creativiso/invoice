import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProform, IProformItem } from '../../../../../libs/typings/src/index';

@Injectable({
  providedIn: 'root',
})
export class ProformsService {
  private apiUrl = 'http://localhost:3333/api/v1/proforms';

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
  getAllProforms() {
    return this.http.get(`${this.apiUrl}/`);
  }

  getProformById(proformId: number) {
    return this.http.get(`${this.apiUrl}/${proformId}`);
  }
}
