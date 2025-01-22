import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, throwError } from 'rxjs';
import { LoginUser } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup<LoginUser> = this.buildForm();
  private buildForm() {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}
  logIn() {
    const { email, password } = this.form.value;
    if (email && password)
      this.auth
        .login(email, password)
        .pipe(
          this.toast.observe({
            success: 'Logged in successfully',
            loading: 'Logging in...',
            error: ({ message }) => `There was an error: ${message}`,
          }),
          catchError((error) => {
            return throwError('Something went wrong');
          })
        )
        .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
