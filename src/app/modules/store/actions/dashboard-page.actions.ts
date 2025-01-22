import { createAction, props } from '@ngrx/store';
import { Booking, BookingStatus } from 'src/app/models/booking.model';

export const loadTentativeBookings = createAction(
  '[API] load tentative bookings',
  props<{ entityNo: number }>()
);
export const loadTentativeBookingsSuccess = createAction(
  '[API] load past bookings success',
  props<{ bookings: Booking[] }>()
);
export const loadTentativeBookingsFail = createAction(
  '[API] load past bookings success',
  props<{ error: string }>()
);
export const updateTentativeBooking = createAction(
  '[HealthPage] confirm reject tentative Booking',
  props<{ bookingId: number; status: BookingStatus }>()
);
export const updateTentativeBookingSuccess = createAction(
  '[API] update tentative booking success',
  props<{ booking: Booking }>()
);
export const updateTentativeBookingFail = createAction(
  '[API] update tentative booking fail',
  props<{ error: string }>()
);
export const clearSelectedTentativeBooking = createAction(
  '[HealthPage] Clear selected tentative booking'
);
