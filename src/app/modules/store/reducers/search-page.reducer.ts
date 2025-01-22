import { createReducer, on } from '@ngrx/store';
import * as SearchPageActions from '../actions/search-page.actions';
import { initialSearchPageState } from '../states/search-page.state';
export const searchPageReducer = createReducer(
  initialSearchPageState,
  on(SearchPageActions.loadDoctorsSuccess, (state, action) => {
    return {
      ...state,
      doctors: action.doctors,
    };
  }),
  on(SearchPageActions.searchDoctorSuccess, (state, action) => {
    return {
      ...state,
      doctors: action.searchedDoctor,
    };
  })
);
