import { Component } from '@angular/core';

@Component({
  selector: 'crtvs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pages';
  opened = this.isLargeScreen();
  isLargeScreen(): boolean {
    if (window.screen.width > 728) {
      return true;
    }
    return false;
  }
  logout() {
    //logout
  }
}
