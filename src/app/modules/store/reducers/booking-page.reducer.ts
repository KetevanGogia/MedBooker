import { createReducer, on } from '@ngrx/store';
import * as BookingPageActions from '../actions/booking-page.actions';
import { initialBookingPageState } from '../states/booking-page.state';
export const bookingPageReducer = createReducer(
  initialBookingPageState,
  on(BookingPageActions.getDoctorSuccess, (state, action) => {
    return {
      ...state,
      doctor: action.doctor,
    };
  })
);
