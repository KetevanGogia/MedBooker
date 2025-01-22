import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { of } from 'rxjs';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { RegisterComponent } from './register.component';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: AuthService;
  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);
    (
      mockAuthService.register as jasmine.Spy<AuthService['register']>
    ).and.returnValue(of());
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        NbLayoutModule,
        NbThemeModule.forRoot(),
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should register the user', () => {
    component.form.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password',
      entityNo: 1234567890,
    });

    component.register();

    expect(mockAuthService.register).toHaveBeenCalledWith(
      'john.doe@example.com',
      'password',
      'John',
      'Doe',
      1234567890
    );
  });
});
