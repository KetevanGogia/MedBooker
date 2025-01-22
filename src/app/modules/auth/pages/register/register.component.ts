import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/shared/utils/user.validator';
import { RegisterUser } from 'src/app/models/users.model';
import { UserRoles } from 'src/app/models/members.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userRoles = UserRoles;
  form: FormGroup<RegisterUser> = this.buildForm();
  constructor(
    private toast: HotToastService,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}
  private buildForm() {
    return this.fb.group(
      {
        firstName: this.fb.control('', [Validators.required]),
        lastName: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required]),
        confirmPassword: this.fb.control('', [Validators.required]),
        entityNo: this.fb.control(null, [Validators.required]),
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  register() {
    const { email, password, firstName, lastName, entityNo } = this.form.value;
    if (email && password && firstName && lastName && entityNo)
      this.auth
        .register(email, password, firstName, lastName, entityNo)
        .pipe(
          this.toast.observe({
            success: 'Success',
            loading: 'Loading...',
            error: (err) => `${err?.message}`,
          })
        )
        .subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
  }
}
