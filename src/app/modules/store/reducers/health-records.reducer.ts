import { createReducer, on } from '@ngrx/store';
import {
  HealthRecords,
  initialHealthRecordsState,
} from '../states/health-records.state';
import * as HealthRecordsActions from '../actions/health-records.actions';
export const healthRecordsReducer = createReducer(
  initialHealthRecordsState,
  on(
    HealthRecordsActions.loadPastBookingsSuccess,
    (state, action): HealthRecords => {
      return {
        ...state,
        pastBookings: action.bookings,
      };
    }
  ),
  on(
    HealthRecordsActions.loadPastBookingsFail,
    (state, action): HealthRecords => {
      return {
        ...state,
        pastBookings: [],
        selectedPastBooking: undefined,
      };
    }
  ),
  on(HealthRecordsActions.selectPastBooking, (state, action) => {
    return { ...state, selectedPastBooking: action.booking };
  }),
  on(HealthRecordsActions.clearSelectedPastBooking, (state, action) => {
    return { ...state, selectedPastBooking: undefined };
  })
);
