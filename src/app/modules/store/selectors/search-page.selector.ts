import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchPage } from '../states/search-page.state';

const selectSearchPageState = createFeatureSelector<SearchPage>('searchPage');
export const selectDoctors = createSelector(selectSearchPageState, (state) => {
  return state.doctors;
});
export const getSelectedDoctor = createSelector(
  selectSearchPageState,
  (state) => state.selectedDoctor
);
