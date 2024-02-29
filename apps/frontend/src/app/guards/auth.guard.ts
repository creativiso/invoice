import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getLoginStatus.pipe(
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        } else return true;
      })
    );
  }
}
