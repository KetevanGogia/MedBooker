import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { AnonymGuardGuard } from 'src/app/guards/anonym-guard.guard';
import { NbLayoutModule } from '@nebular/theme';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    CommonModule,
    NbLayoutModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AnonymGuardGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AnonymGuardGuard],
      },
    ]),
  ],
})
export class AuthModule {}
