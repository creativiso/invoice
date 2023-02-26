import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proform } from '../../../../backend/src/app/model/models/Proform';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProformService {
  private baseUrl = 'http://localhost:3333/api/v1/proforms';

  constructor(private http: HttpClient) {}

  getAllProforms(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProformById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProform(proform: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, proform);
  }

  updateProform(id: number, proform: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, proform);
  }
  //   createProform(proform: Proform): Observable<Proform> {
  //     return this.http.post<Proform>(this.baseUrl, proform);
  //   }
}
