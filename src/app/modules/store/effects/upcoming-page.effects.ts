import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Booking, BookingStatus } from 'src/app/models/booking.model';
import { AttendeeType, UserRoles } from 'src/app/models/members.model';
import { BookingService } from 'src/app/services/booking.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { MapperService } from 'src/app/services/mapper.service';
import { getBookings } from 'src/app/shared/utils/helper.fn';
import * as UpcomingPageActions from '../actions/upcoming-page.actions';
@Injectable({
  providedIn: 'root',
})
export class UpcomingPageEffects {
  loadUpcomingBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingPageActions.loadUpcomingBookings),
      mergeMap((action) => {
        return this.bookingService
          .retriveBooking(action.entityNo, new Date().toISOString())
          .pipe(
            map((value) =>
              getBookings(value.bookingMap, BookingStatus.Confirmed)
            ),
            switchMap((bookings: Booking[]) => {
              if (action.entityNo == UserRoles.Patient) {
                const entityNos = this.mapperService.getEntityNos(
                  bookings,
                  AttendeeType.Provider
                );
                if (entityNos.length) {
                  return forkJoin(
                    entityNos.map((entityNo) =>
                      this.doctorsService.retrieveSingleDoctor(entityNo || 0)
                    )
                  ).pipe(
                    map((doctors) =>
                      this.mapperService.mergeData(bookings, doctors)
                    )
                  );
                }
                return of([]);
              }
              return of(bookings);
            }),
            map((bookings: Booking[]) =>
              UpcomingPageActions.loadUpcomingBookingsSuccess({ bookings })
            ),
            catchError((error) =>
              of(UpcomingPageActions.loadUpcomingBookingsFail({ error }))
            )
          );
      })
    );
  });
  cancelUpcomingBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingPageActions.cancelUpcomingBooking),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.bookingId, action.booking)
          .pipe(
            this.toast.observe({
              success: 'Canceled successfully',
              loading: 'Loading...',
              error: (err) => `${err?.message}`,
            }),
            map((b) =>
              UpcomingPageActions.cancelUpcomingBookingSuccess({ booking: b })
            ),
            catchError((error) =>
              of(
                UpcomingPageActions.cancelUpcomingBookingFail({
                  error: error.message,
                })
              )
            )
          );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private mapperService: MapperService,
    private bookingService: BookingService,
    private doctorsService: DoctorsService,
    private toast: HotToastService
  ) {}
}
