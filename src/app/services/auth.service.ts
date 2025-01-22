import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { authState, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';
import { FirebaseUser } from '../models/users.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: FirebaseUser | undefined;
  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this._currentUser = user;
      }
    });
  }
  get currentUser() {
    return this._currentUser?.displayName
      ? JSON.parse(this._currentUser.displayName)
      : '';
  }
  login(email: string, password: string) {
    return from(this.fireauth.signInWithEmailAndPassword(email, password));
  }
  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    entityNo: number
  ) {
    return from(
      this.fireauth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap(({ user }) =>
        user!.updateProfile({
          displayName: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            entityNo: entityNo,
          }),
        })
      )
    );
  }
  logout() {
    return from(this.fireauth.signOut());
  }
  getCurrentUser() {
    return this.fireauth.authState;
  }
}
