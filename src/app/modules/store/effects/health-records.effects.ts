import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { BookingService } from 'src/app/services/booking.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { MapperService } from 'src/app/services/mapper.service';
import * as HealthRecordsActions from '../actions/health-records.actions';
@Injectable({
  providedIn: 'root',
})
export class HealthRecordsEffects {
  loadPastBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthRecordsActions.loadPastBookings),
      mergeMap((action) => {
        return this.bookingService
          .retriveBooking(action.entityNo, '', new Date().toISOString())
          .pipe(
            map((value) => Object.values(value.bookingMap).flat()),
            switchMap((bookings: Booking[]) => {
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
            }),
            map((bookings: Booking[]) => {
              return HealthRecordsActions.loadPastBookingsSuccess({
                bookings: bookings,
              });
            }),
            catchError((error) => {
              return of(
                HealthRecordsActions.loadPastBookingsFail({ error: error })
              );
            })
          );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private doctorsService: DoctorsService,
    private mapperService: MapperService
  ) {}
}
