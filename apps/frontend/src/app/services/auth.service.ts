import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>('/api/v1/login', { username, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }
}
