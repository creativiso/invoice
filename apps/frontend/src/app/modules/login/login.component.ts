import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'crtvs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isVisible = false;
  }
}
