import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proform } from '../../../../backend/src/app/model/models/Proform';
import { ProformItem } from '../../../../backend/src/app/model/models/ProformItem';

interface ProformRequest {
  contractor: number;
  issue_date: Date;
  bank_payment: number;
  vat: number;
  novatreason: string;
  currency: number;
  rate: number;
  c_name: string;
  c_city: string;
  c_address: string;
  c_eik: string;
  c_ddsnumber: string;
  c_mol: string;
  c_person: boolean;
  c_egn: string;
  p_name: string;
  p_city: string;
  p_address: string;
  p_eik: string;
  p_ddsnumber: string;
  p_mol: string;
  p_bank: string;
  p_iban: string;
  p_bic: string;
  p_zdds: boolean;
  author: string;
  author_user: number;
  author_sign: string;
}

interface ProformItemRequest {
  proform: number;
  name: string;
  quantity: number;
  measurement: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProformService {
  constructor(private http: HttpClient) {}

  createProform(dataProform: ProformRequest): Observable<Proform> {
    return this.http.post<Proform>(
      'http://localhost:3333/api/v1/proforms/add',
      dataProform
    );
  }

  createProformItem(
    dataProformItems: ProformItemRequest
  ): Observable<ProformItem> {
    return this.http.post<ProformItem>(
      `http://localhost:3333/api/v1/proformitems/:${dataProformItems}/items`,
      dataProformItems
    );
  }
  getProform(proformId: number): Observable<Proform> {
    return this.http.get<Proform>(
      `http://localhost:3333/api/v1/proforms/${proformId}`
    );
  }
  getProformItem(itemId: number): Observable<ProformItem> {
    return this.http.get<ProformItem>(
      `http://localhost:3333/api/v1/proformitems/${itemId}`
    );
  }
  updateProformItem(
    itemId: number,
    dataProformItem: ProformItemRequest
  ): Observable<ProformItem> {
    return this.http.put<ProformItem>(
      `http://localhost:3333/api/v1/proformitems/${itemId}`,
      dataProformItem
    );
  }
}
