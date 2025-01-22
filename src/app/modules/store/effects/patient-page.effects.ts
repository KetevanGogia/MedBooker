import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  Booking,
  BookingRequest,
  BookingStatus,
} from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { MembersService } from 'src/app/services/members.service';
import * as PatientsPageActions from '../actions/patients-page.actions';
@Injectable({
  providedIn: 'root',
})
export class PatientsPageEffects {
  loadPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsPageActions.loadPatients),
      mergeMap((action) => {
        return this.membersService.retrieveAllPatients().pipe(
          map((patients) => {
            return PatientsPageActions.loadPatientsSuccess({
              patients: patients,
            });
          }),
          catchError((error) =>
            of(PatientsPageActions.loadPatientsFail({ error: error }))
          )
        );
      })
    );
  });
  searchPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsPageActions.searchPatient),
      mergeMap((action) => {
        if (!action.firstName && !action.lastName) {
          return this.membersService.retrieveAllPatients();
        }
        return this.membersService.searchPatients(
          action.firstName || '',
          action.lastName || ''
        );
      }),
      map((patient) =>
        PatientsPageActions.searchPatientSuccess({ patient: patient })
      )
    );
  });
  createBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsPageActions.createBooking),
      mergeMap((action) => {
        console.log(action);
        const newbooking = {
          attendees: [
            {
              attendeeType: AttendeeType.Patient,
              entity: {
                entityNo: action.chosenPatient.entityNo,
                firstName: action.chosenPatient.firstName,
                lastName: action.chosenPatient.lastName,
              },
              entityNo: action.chosenPatient.entityNo,
            },
            {
              attendeeType: AttendeeType.Provider,
              entity: {
                entityNo: this.authService.currentUser.entityNo,
                firstName: this.authService.currentUser.firstName,
                lastName: this.authService.currentUser.lastName,
              },
              entityNo: this.authService.currentUser.entityNo,
            },
          ],
          description: '',
          endDate: action.date ? new Date(action.date).toISOString() : '',
          organiser: this.authService.currentUser.entityNo,
          startDate: action.date ? new Date(action.date).toISOString() : '',
        };
        return this.bookingService.createBooking(newbooking).pipe(
          switchMap((booking: Booking) => {
            return this.bookingService.updateBooking(booking.id, {
              bookingStatus: BookingStatus.Confirmed,
              comment: '',
              includeDependent: true,
            });
          }),
          map((booking) =>
            PatientsPageActions.createBookingSuccess({ booking: booking })
          ),
          this.toast.observe({
            success: 'Success',
            loading: 'Loading...',
            error: (err) => `${err?.message}`,
          })
        );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private membersService: MembersService,
    private bookingService: BookingService,
    private toast: HotToastService,
    private authService: AuthService
  ) {}
}
