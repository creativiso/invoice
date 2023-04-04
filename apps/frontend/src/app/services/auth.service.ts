import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/api/v1/login';
  private loggedIn = new BehaviorSubject<boolean>(false); //track user status

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}`, { username, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
          }
        }),
        map((response) => {
          const token = response.token;
          if (token) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
