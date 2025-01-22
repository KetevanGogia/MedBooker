import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  Booking,
  BookingStatusUpdateRequest,
} from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { BookingStatus } from 'src/app/models/booking.model';
import { UserRoles } from 'src/app/models/members.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentDetailsComponent {
  attendeeType = AttendeeType;
  bookingStatus = BookingStatus;
  userRoles = UserRoles;
  currentUser = this.authService.currentUser;
  @Input() displayCancelBtn: boolean | undefined;
  @Input() selectedBooking: Booking | undefined;
  @Input() seeDetails: boolean | undefined;
  @Output() onCancelBooking = new EventEmitter();
  static Default: ChangeDetectionStrategy | undefined;
  constructor(private authService: AuthService) {}
  cancelBooking(
    bookingId: number | undefined,
    booking: BookingStatusUpdateRequest
  ) {
    if (bookingId) this.onCancelBooking.emit({ bookingId, booking });
  }
}
