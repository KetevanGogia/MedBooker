import { Booking, BookingStatus } from 'src/app/models/booking.model';

export function getBookings(
  bookingMap: { [key: string]: Booking[] },
  status: BookingStatus
) {
  return Object.values(bookingMap)
    .flat()
    .filter((response: Booking) => response.status == status);
}
