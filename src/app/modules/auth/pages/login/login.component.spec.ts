import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NbLayoutModule } from '@nebular/theme';
import { NbThemeModule } from '@nebular/theme';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        NbLayoutModule,
        NbThemeModule.forRoot(),
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call AuthService.login() on successful login', () => {
    const email = 'test@example.com';
    const password = 'password123';
    authService.login.and.returnValue(of());

    component.form.patchValue({ email, password });
    component.logIn();

    expect(authService.login).toHaveBeenCalledWith(email, password);
  });
});
