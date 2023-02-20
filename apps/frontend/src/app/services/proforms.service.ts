import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProformService {
  private baseUrl = 'http://localhost:4200/proformas';

  constructor(private http: HttpClient) {}

  getAllProforms() {
    return this.http.get(this.baseUrl);
  }

  getProformById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProform(proform: any) {
    return this.http.post(this.baseUrl, proform);
  }

  updateProform(id: number, proform: any) {
    return this.http.put(`${this.baseUrl}/${id}`, proform);
  }
}
