import { Booking } from 'src/app/models/booking.model';

export interface RequestsPage {
  bookings: Booking[];
  selectedBooking: Booking | undefined;
}
export const initialRequestsPageState: RequestsPage = {
  bookings: [],
  selectedBooking: undefined,
};
