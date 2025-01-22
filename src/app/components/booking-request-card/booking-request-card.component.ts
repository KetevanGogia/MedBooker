import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { BookingStatus } from 'src/app/models/booking.model';
@Component({
  selector: 'app-booking-request-card',
  templateUrl: './booking-request-card.component.html',
  styleUrls: ['./booking-request-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingRequestCardComponent {
  attendeeType = AttendeeType;
  bookingStatus = BookingStatus;
  @Input() booking: Booking | undefined;
  @Output() onStatusChange = new EventEmitter<{
    bookingId: number | undefined;
    status: BookingStatus;
  }>();
  static Default: ChangeDetectionStrategy | undefined;

  acceptRejectBtns(bookingId: number | undefined, status: BookingStatus) {
    this.onStatusChange.emit({ bookingId, status });
  }
}
