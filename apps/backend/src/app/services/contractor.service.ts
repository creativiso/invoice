import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContractor } from 'libs/typings/src/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  private endpoint = 'api/contractors/';

  constructor(private http: HttpClient) {}

  getContractors(): Observable<IContractor[]> {
    return this.http.get<IContractor[]>(this.endpoint);
  }

  getContractor(id: number): Observable<IContractor> {
    return this.http.get<IContractor>(`${this.endpoint}${id}/`);
  }

  createContractor(contractor: IContractor): Observable<IContractor> {
    return this.http.post<IContractor>(this.endpoint, contractor);
  }

  updateContractor(contractor: IContractor): Observable<IContractor> {
    return this.http.put<IContractor>(
      `${this.endpoint}${contractor.id}/`,
      contractor
    );
  }

  deleteContractor(id: number): Observable<IContractor> {
    return this.http.delete<IContractor>(`${this.endpoint}${id}/`);
  }
}
