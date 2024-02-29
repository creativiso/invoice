import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/api/v1';
  private loggedIn = new BehaviorSubject<boolean>(false); //track user status
  private firstLoad = true;

  constructor(private http: HttpClient) {
    this.validateToken();
  }

  get getLoginStatus(): Observable<boolean> {
    if (this.firstLoad) {
      this.firstLoad = false;
      return this.validateToken();
    }
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((isLoggedIn: boolean) => {
          this.loggedIn.next(isLoggedIn);
          return isLoggedIn;
        }),
        catchError((error) => {
          console.error(error);
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  logout(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/logout`).pipe(
      tap((isLoggedIn: boolean) => {
        this.loggedIn.next(isLoggedIn);
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    );
  }

  // Validate token on firstLoad/refresh
  private validateToken(): Observable<boolean> {
    // send empty ping request to validate cookie token
    return this.http.get<boolean>(`${this.apiUrl}/ping`).pipe(
      tap((isLoggedIn: boolean) => {
        this.loggedIn.next(isLoggedIn);
        return isLoggedIn;
      }),
      catchError((error) => {
        console.error(error);
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }
}
