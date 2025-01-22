import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsPage } from '../states/requests-page.state';

const selectRequestsPageState =
  createFeatureSelector<RequestsPage>('requestsPage');
export const selectRequestBookings = createSelector(
  selectRequestsPageState,
  (state) => state.bookings
);
export const getSelectedRequestBooking = createSelector(
  selectRequestsPageState,
  (state) => state.selectedBooking
);
