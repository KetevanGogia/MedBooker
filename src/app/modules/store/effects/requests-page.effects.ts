import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BookingStatus } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { getBookings } from 'src/app/shared/utils/helper.fn';
import * as RequestsPageActions from '../actions/requests-page.actions';
@Injectable({
  providedIn: 'root',
})
export class RequestsPageEffects {
  loadBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestsPageActions.loadBookings),
      mergeMap((action) => {
        return this.bookingService
          .retriveBooking(action.entityNo, new Date().toISOString())
          .pipe(
            map((booking) => {
              return getBookings(booking.bookingMap, BookingStatus.Tentative);
            }),
            map((booking) =>
              RequestsPageActions.loadBookingsSuccess({ bookings: booking })
            ),
            catchError((error) =>
              of(RequestsPageActions.loadBookingsFail({ error: error }))
            )
          );
      })
    );
  });
  updateBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestsPageActions.updateBooking),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.bookingId, {
            bookingStatus: action.status,
            comment: '',
            includeDependent: true,
          })
          .pipe(
            map((booking) =>
              RequestsPageActions.updateBookingSuccess({ booking: booking })
            ),
            catchError((error) =>
              of(RequestsPageActions.updateBookingFail({ error: error }))
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
