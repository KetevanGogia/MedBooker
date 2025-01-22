import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
      ],
      providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthStunt }],
    });
    service = TestBed.inject(AuthService);
    spyOn(AuthService.prototype, 'login');
    spyOn(AuthService.prototype, 'register');
    spyOn(AuthService.prototype, 'logout');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('login', () => {
    it('should call login with correct email and password', () => {
      const email = 'test@gmail.com';
      const password = '123456';
      service.login(email, password);
      expect(service.login).toHaveBeenCalledWith(email, password);
    });
  });
  describe('register', () => {
    it('should call register with correct email, password,firstname,lastname and entityno', () => {
      const email = 'test@gmail.com';
      const password = '123456';
      const firstName = 'test';
      const lastName = 'test';
      const entityNo = 12345678;
      service.register(email, password, firstName, lastName, entityNo);
      expect(service.register).toHaveBeenCalledWith(
        email,
        password,
        firstName,
        lastName,
        entityNo
      );
    });
  });
  describe('logout', () => {
    it('should call logout', () => {
      service.logout();
      expect(service.logout).toHaveBeenCalled();
    });
  });
});
class AngularFireAuthStunt {
  authState: Observable<firebase.default.UserInfo | null> = of({
    displayName: 'test',
    email: 'test@gmail.com',
    phoneNumber: null,
    photoURL: null,
    providerId: '111',
    uid: 'ffff',
  });
}
