import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardPage } from '../states/dashboard-page.state';

const selectDashboardPageState =
  createFeatureSelector<DashboardPage>('dashboardPage');
export const selectTentativeBookings = createSelector(
  selectDashboardPageState,
  (state) => state.tentativeBookings
);
// export const getSelectedTentativeBooking = createSelector(
//   selectDashboardPageState,
//   (state) => state.selectedTentativeBooking
// );
