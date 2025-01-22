import { createReducer, on } from '@ngrx/store';
import { initialRequestsPageState } from '../states/requests-page.state';
import * as RequestsPageActions from '../actions/requests-page.actions';
export const requestsPageReducer = createReducer(
  initialRequestsPageState,
  on(RequestsPageActions.loadBookingsSuccess, (state, action) => {
    return {
      ...state,
      bookings: action.bookings,
    };
  }),
  on(RequestsPageActions.updateBookingSuccess, (state, action) => {
    console.log(action.booking);
    return {
      ...state,
      bookings: state.bookings.filter((b) => b.id != action.booking.id),
    };
  })
);
