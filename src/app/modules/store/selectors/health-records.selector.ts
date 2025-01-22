import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HealthRecords } from '../states/health-records.state';

const selectHealthRecordState =
  createFeatureSelector<HealthRecords>('healthRecords');
export const selectPastBookings = createSelector(
  selectHealthRecordState,
  (state) => state.pastBookings
);
export const getSelectedPastBooking = createSelector(
  selectHealthRecordState,
  (state) => state.selectedPastBooking
);
