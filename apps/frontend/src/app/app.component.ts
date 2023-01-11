import { Component, ViewChild} from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'crtvs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isHandset: boolean ; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('drawer') drawer: any;
  title = 'frontend';
  constructor(private breakpointObserver: BreakpointObserver) {
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
  }

  public toggleNav() {
    this.isHandset = !this.isHandset;
  }
  
}