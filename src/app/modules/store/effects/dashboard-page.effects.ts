import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { BookingStatus } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { getBookings } from 'src/app/shared/utils/helper.fn';
import * as DashboardPageActions from '../actions/dashboard-page.actions';
@Injectable({
  providedIn: 'root',
})
export class DashboardPageEffects {
  loadTentativeBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadTentativeBookings),
      mergeMap((action) => {
        return this.bookingService
          .retriveBooking(action.entityNo, new Date().toISOString())
          .pipe(
            map((booking) => {
              return getBookings(booking.bookingMap, BookingStatus.Tentative);
            }),
            map((bookings) =>
              DashboardPageActions.loadTentativeBookingsSuccess({ bookings })
            ),
            catchError((error) =>
              of(DashboardPageActions.loadTentativeBookingsFail({ error }))
            )
          );
      })
    );
  });
  updateBookingStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.updateTentativeBooking),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.bookingId, {
            bookingStatus: action.status,
            comment: '',
            includeDependent: true,
          })
          .pipe(
            map((booking) =>
              DashboardPageActions.updateTentativeBookingSuccess({
                booking: booking,
              })
            ),
            catchError((error) =>
              of(
                DashboardPageActions.updateTentativeBookingFail({
                  error: error,
                })
              )
            )
          );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}
}
