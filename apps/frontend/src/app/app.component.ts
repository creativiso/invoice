import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'crtvs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isHandset: boolean;
  public isLoggedIn = false; // Initialize isLoggedIn property

  @ViewChild('drawer') drawer: any;
  title = 'Pages';
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {
    this.isHandset = true;
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isHandset = true;
        } else {
          this.isHandset = false;
        }
      });

    // Subscribe to isLoggedIn observable to update menu visibility
    this.authService.getLoginStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.router.events.subscribe((event) => {
      // close sidenav on routing
      if (this.isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }

  public toggleNav() {
    this.isHandset = !this.isHandset;
  }

  public logout() {
    this.authService.logout().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }
}
