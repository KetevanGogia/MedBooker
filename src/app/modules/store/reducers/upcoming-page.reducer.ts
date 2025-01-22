import { createReducer, on } from '@ngrx/store';
import { initialUpcomingPageState } from '../states/upcoming-page.state';
import * as UpcomingPageActions from '../actions/upcoming-page.actions';
export const UpcomingPageReducer = createReducer(
  initialUpcomingPageState,
  on(UpcomingPageActions.loadUpcomingBookingsSuccess, (state, action) => {
    return {
      ...state,
      upcomingBookings: action.bookings,
    };
  }),
  on(UpcomingPageActions.loadUpcomingBookingsFail, (state, action) => {
    return {
      ...state,
      upcomingBookings: [],
    };
  }),
  on(UpcomingPageActions.selectUpcomingBooking, (state, action) => {
    return { ...state, selectedUpcomingBooking: action.booking };
  }),
  on(UpcomingPageActions.cancelUpcomingBookingSuccess, (state, action) => {
    return {
      ...state,
      upcomingBookings: state.upcomingBookings.filter(
        (b) => b.id != action.booking.id
      ),
      selectedUpcomingBooking: undefined,
    };
  }),
  on(UpcomingPageActions.clearSelectedUpcomingBooking, (state, action) => {
    return {
      ...state,
      selectedUpcomingBooking: undefined,
    };
  })
);
