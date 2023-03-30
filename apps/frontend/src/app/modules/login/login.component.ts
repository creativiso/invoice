import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crtvs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  errorMessage!: string;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.submitted = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Username or password is not valid';
        console.log('ggg');
      }
    });
  }
}
