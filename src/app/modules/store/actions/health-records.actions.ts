import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/models/booking.model';

export const loadPastBookings = createAction(
  '[API] load past bookings',
  props<{ entityNo: number }>()
);
export const loadPastBookingsSuccess = createAction(
  '[API] load past bookings success',
  props<{ bookings: Booking[] }>()
);
export const loadPastBookingsFail = createAction(
  '[API] load past bookings fail',
  props<{ error: string }>()
);
export const selectPastBooking = createAction(
  '[HealthPage] Select Past Booking',
  props<{ booking: Booking }>()
);
export const clearSelectedPastBooking = createAction(
  '[HealthPage] Clear selected past booking'
);
