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
    this.authService.login(username, password).subscribe({
      next: () => {
        // If authentication is successful, navigate to the main page
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err); // add a console.log statement here to check if it is being executed
        // Set the error message to display on the login page
        this.errorMessage = 'Username or password is not valid';
      },
    });
  }
}
