import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { bookingPageReducer } from './booking-page.reducer';
import { dashboardPageReducer } from './dashboard-page.reducer';
import { healthRecordsReducer } from './health-records.reducer';
import { patientsPageReducer } from './patients-page.reducer';
import { requestsPageReducer } from './requests-page.reducer';
import { searchPageReducer } from './search-page.reducer';
import { UpcomingPageReducer } from './upcoming-page.reducer';

export const reducers: ActionReducerMap<AppState> = {
  healthRecords: healthRecordsReducer,
  dashboardPage: dashboardPageReducer,
  upcomingPage: UpcomingPageReducer,
  patientsPage: patientsPageReducer,
  requestsPage: requestsPageReducer,
  searchPage: searchPageReducer,
  bookingPage: bookingPageReducer,
};
