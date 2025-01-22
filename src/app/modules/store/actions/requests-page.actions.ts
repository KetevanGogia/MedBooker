import { createAction, props } from '@ngrx/store';
import { Booking, BookingStatus } from 'src/app/models/booking.model';

export const loadBookings = createAction(
  '[API] load tentative bookings',
  props<{ entityNo: number; date: string }>()
);
export const loadBookingsSuccess = createAction(
  '[API] load past bookings success',
  props<{ bookings: Booking[] }>()
);
export const loadBookingsFail = createAction(
  '[API] load past bookings success',
  props<{ error: string }>()
);
export const updateBooking = createAction(
  '[HealthPage] confirm reject Booking',
  props<{ bookingId: number; status: BookingStatus }>()
);
export const updateBookingSuccess = createAction(
  '[API] update booking success',
  props<{ booking: Booking }>()
);
export const updateBookingFail = createAction(
  '[API] update booking fail',
  props<{ error: string }>()
);
