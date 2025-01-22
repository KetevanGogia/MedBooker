import { Booking } from 'src/app/models/booking.model';

export interface UpcomingPage {
  upcomingBookings: Booking[];
  selectedUpcomingBooking: Booking | undefined;
}
export const initialUpcomingPageState: UpcomingPage = {
  upcomingBookings: [],
  selectedUpcomingBooking: undefined,
};
