import { createAction, props } from '@ngrx/store';
import {
  Booking,
  BookingStatusUpdateRequest,
} from 'src/app/models/booking.model';

export const loadUpcomingBookings = createAction(
  '[API] load upcoming bookings',
  props<{ entityNo: number }>()
);
export const loadUpcomingBookingsSuccess = createAction(
  '[API] load upcoming bookings success',
  props<{ bookings: Booking[] }>()
);
export const loadUpcomingBookingsFail = createAction(
  '[API] load upcoming bookings fail',
  props<{ error: string }>()
);
export const selectUpcomingBooking = createAction(
  '[HealthPage] Select Upcoming Booking',
  props<{ booking: Booking }>()
);
export const cancelUpcomingBooking = createAction(
  '[API] cancel upcoming booking',
  props<{
    bookingId: number;
    booking: BookingStatusUpdateRequest;
  }>()
);
export const cancelUpcomingBookingSuccess = createAction(
  '[API] cancel upcoming booking success',
  props<{ booking: Booking }>()
);
export const cancelUpcomingBookingFail = createAction(
  '[API] cancel upcoming booking fail',
  props<{ error: string }>()
);
export const clearSelectedUpcomingBooking = createAction(
  '[UpcomingPage] clear selected upcoming booking'
);
