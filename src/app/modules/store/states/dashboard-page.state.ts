import { Booking } from 'src/app/models/booking.model';

export interface DashboardPage {
  tentativeBookings: Booking[];
}
export const initialDashboardPageState: DashboardPage = {
  tentativeBookings: [],
};
