import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, mapTo, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/api/v1/login';
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}`, { username, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            // Set the token in local storage
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
          }
        }),
        mapTo(true),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the JWT token to get the user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }
}
