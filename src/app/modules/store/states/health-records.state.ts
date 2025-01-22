import { Booking } from 'src/app/models/booking.model';

export interface HealthRecords {
  pastBookings: Booking[];
  selectedPastBooking: Booking | undefined;
}
export const initialHealthRecordsState: HealthRecords = {
  pastBookings: [],
  selectedPastBooking: undefined,
};
