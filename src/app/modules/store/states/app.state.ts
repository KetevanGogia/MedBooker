import { BookingPage, initialBookingPageState } from './booking-page.state';
import {
  DashboardPage,
  initialDashboardPageState,
} from './dashboard-page.state';
import {
  HealthRecords,
  initialHealthRecordsState,
} from './health-records.state';
import { initialPatientsPageState, PatientsPage } from './patients-page.state';
import { initialRequestsPageState, RequestsPage } from './requests-page.state';
import { initialSearchPageState, SearchPage } from './search-page.state';
import { initialUpcomingPageState, UpcomingPage } from './upcoming-page.state';

export interface AppState {
  healthRecords: HealthRecords;
  dashboardPage: DashboardPage;
  upcomingPage: UpcomingPage;
  patientsPage: PatientsPage;
  requestsPage: RequestsPage;
  searchPage: SearchPage;
  bookingPage: BookingPage;
}
const initialAppState: AppState = {
  healthRecords: initialHealthRecordsState,
  dashboardPage: initialDashboardPageState,
  upcomingPage: initialUpcomingPageState,
  patientsPage: initialPatientsPageState,
  requestsPage: initialRequestsPageState,
  searchPage: initialSearchPageState,
  bookingPage: initialBookingPageState,
};
