import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContractor } from '../../../../../libs/typings/src/index';

@Injectable({
  providedIn: 'root',
})
export class ContractorsService {
  private apiUrl = 'http://localhost:3333/api/v1/contractors';

  constructor(private http: HttpClient) {}

  createContractor(contractorData: IContractor) {
    return this.http.post(`${this.apiUrl}/add`, contractorData);
  }

  updateContractor(contractorId: number, contractorData: IContractor) {
    return this.http.put(`${this.apiUrl}/${contractorId}`, contractorData);
  }

  getAllContractors() {
    return this.http.get(`${this.apiUrl}/`);
  }

  getContractorById(contractorId: number) {
    return this.http.get(`${this.apiUrl}/${contractorId}`);
  }
}
