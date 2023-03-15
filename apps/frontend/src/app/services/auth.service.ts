import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        username,
        password,
      })
      .pipe(map((response) => response.token));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
