import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

import { AnonymGuardGuard } from './anonym-guard.guard';

describe('AnonymGuardGuard', () => {
  let guard: AnonymGuardGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
      ],
      providers: [AuthService, Router],
    });
    guard = TestBed.inject(AnonymGuardGuard);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
