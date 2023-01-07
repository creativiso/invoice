import { Component, ViewChild} from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'crtvs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  @ViewChild('drawer') drawer: any;
 public selectedItem  = '';
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .pipe(map((result: BreakpointState) => result.matches));


  constructor(private breakpointObserver: BreakpointObserver) {}

closeSideNav() {
  if (this.drawer._mode=='over') {
    this.drawer.close();
  }
}
}
//export class AppComponent {
 
  //opened = true;
  //isLargeScreen():boolean{
  // if (window.screen.width >1024) {
  //   return true
  //  }
  //  return false
 //}
//}
