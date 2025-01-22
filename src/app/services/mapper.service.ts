import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { AttendeeType, Practitioner } from '../models/members.model';

@Injectable({
  providedIn: 'root',
})
export class MapperService {
  getEntityNos(bookings: Booking[], attendType: AttendeeType) {
    return bookings.map(
      (booking) =>
        booking.attendees.find((a) => a.attendeeType == attendType)?.entityNo
    );
  }

  mergeData(bookings: Booking[], doctors: Practitioner[]) {
    return bookings.map((elem, index) => {
      return {
        ...elem,
        practiceName: doctors[index].practiceName,
      };
    });
  }
}
