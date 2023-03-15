import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crtvs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  isSubmitted = false;
  constructor(
    private sidebarService: SidebarService,
    private formbuilder: FormBuilder
  ) {
    this.sidebarService.isVisible = false;
  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }
  get fc() {
    return this.loginForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      alert(
        `Email ${this.fc['email'].value}, password ${this.fc['password'].value}`
      );
    }
  }
}
