import { createReducer, on } from '@ngrx/store';
import { initialDashboardPageState } from '../states/dashboard-page.state';
import * as DashboardPageActions from '../actions/dashboard-page.actions';
export const dashboardPageReducer = createReducer(
  initialDashboardPageState,
  on(DashboardPageActions.loadTentativeBookingsSuccess, (state, action) => {
    return {
      ...state,
      tentativeBookings: action.bookings ? action.bookings.slice(0, 5) : [],
    };
  }),
  on(DashboardPageActions.updateTentativeBookingSuccess, (state, action) => {
    return {
      ...state,
      tentativeBookings: state.tentativeBookings.filter(
        (b) => b.id != action.booking.id
      ),
    };
  })
);
