import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  Observable,
} from 'rxjs';
import { Entity } from 'src/app/models/members.model';
import {
  getSelectedPatient,
  selectPatients,
} from 'src/app/modules/store/selectors/patients-page.selectors';
import { AppState } from 'src/app/modules/store/states/app.state';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import * as PatientsPageActions from '../../modules/store/actions/patients-page.actions';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
  chosenPatient$: Observable<Entity | undefined> =
    this.store.select(getSelectedPatient);
  seeBookingDetails: boolean | undefined;
  currentUser = this.authService.currentUser;
  patients$: Observable<Entity[] | undefined> | undefined;
  form = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
  });
  constructor(
    private membersService: MembersService,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.getPatients();
    this.listenPatients();
    this.listenForm();
  }
  ngOnDestroy() {
    this.store.dispatch(PatientsPageActions.clearSelectedPatient());
  }
  getPatients() {
    this.store.dispatch(PatientsPageActions.loadPatients());
  }
  listenPatients() {
    this.patients$ = this.store.select(selectPatients);
  }
  listenForm() {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        catchError(() => EMPTY)
      )
      .subscribe((formValue) => {
        if (!formValue.firstName && !formValue.lastName) {
          this.store.dispatch(PatientsPageActions.loadPatients());
        }
        this.store.dispatch(
          PatientsPageActions.searchPatient({
            firstName: formValue.firstName,
            lastName: formValue.lastName,
          })
        );
      });
  }
  enableBooking(event: { patient: Entity }) {
    this.store.dispatch(
      PatientsPageActions.selectPatient({
        patient: event.patient,
      })
    );
    this.seeBookingDetails = true;
  }
  handleCreateBooking(payload: { chosenPatient: Entity; date: string }) {
    this.store.dispatch(
      PatientsPageActions.createBooking({
        chosenPatient: payload.chosenPatient,
        date: payload.date,
      })
    );
  }
  identify(index: number, item: Entity) {
    return item.entityNo;
  }
}
