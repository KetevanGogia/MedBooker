import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { AttendeeType } from 'src/app/models/members.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import * as BookingPageActions from '../actions/booking-page.actions';
@Injectable({
  providedIn: 'root',
})
export class BookingPageEffects {
  loadDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingPageActions.getDoctor),
      mergeMap((action) => {
        return this.doctorsService.retrieveSingleDoctor(action.entityNo).pipe(
          map((doctor) =>
            BookingPageActions.getDoctorSuccess({ doctor: doctor })
          ),
          catchError((error) =>
            of(BookingPageActions.getDoctorFail({ error: error }))
          )
        );
      })
    );
  });
  bookDoctor$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BookingPageActions.bookDoctor),
        mergeMap((action) => {
          return this.bookingService
            .createBooking({
              attendees: [
                {
                  attendeeType: AttendeeType.Patient,
                  entity: {
                    entityNo: this.authService.currentUser.entityNo,
                    firstName: this.authService.currentUser.firstName,
                    lastName: this.authService.currentUser.lastName,
                  },
                  entityNo: this.authService.currentUser.entityNo,
                },
                {
                  attendeeType: AttendeeType.Provider,
                  entity: {
                    entityNo: action.doctor.entityNo,
                    firstName: action.doctor.firstName,
                    lastName: action.doctor.lastName,
                  },
                  entityNo: action.doctor.entityNo,
                },
              ],
              description: '',
              endDate: action.startDate
                ? new Date(action.startDate).toISOString()
                : '',
              organiser: this.authService.currentUser.entityNo,
              startDate: action.startDate
                ? new Date(action.startDate).toISOString()
                : '',
            })
            .pipe(
              this.toast.observe({
                success: 'Success',
                loading: 'Loading...',
                error: (err) => `${err?.message}`,
              }),
              tap(() => this.router.navigate(['/upcoming-consultations']))
            );
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private doctorsService: DoctorsService,
    private toast: HotToastService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}
}
