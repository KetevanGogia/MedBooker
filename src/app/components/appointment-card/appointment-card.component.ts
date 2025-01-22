import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { AttendeeType, UserRoles } from 'src/app/models/members.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentCardComponent {
  attendeeType = AttendeeType;
  userRoles = UserRoles;
  currentUser = this.authService.currentUser;
  @Input() booking: Booking | undefined;
  @Output() onEnableDetails = new EventEmitter();
  static Default: ChangeDetectionStrategy | undefined;
  constructor(private authService: AuthService) {}
  enableDetails(booking: Booking | undefined) {
    if (booking) this.onEnableDetails.emit({ booking });
  }
}
