import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UpcomingPage } from '../states/upcoming-page.state';
const selectUpcomingPageState =
  createFeatureSelector<UpcomingPage>('upcomingPage');
export const selectUpcomingBookings = createSelector(
  selectUpcomingPageState,
  (state) => {
    return state.upcomingBookings;
  }
);
export const getSelectedUpcomingBooking = createSelector(
  selectUpcomingPageState,
  (state) => state.selectedUpcomingBooking
);
