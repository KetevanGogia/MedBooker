import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingPage } from '../states/booking-page.state';

const selectBookingPageState =
  createFeatureSelector<BookingPage>('bookingPage');
export const selectDoctorForBooking = createSelector(
  selectBookingPageState,
  (state) => state.doctor
);
