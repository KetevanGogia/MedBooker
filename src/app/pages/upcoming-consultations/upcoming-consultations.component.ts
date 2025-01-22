import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingStatus } from '../../models/booking.model';
import { UserRoles } from '../../models/members.model';
import { AuthService } from '../../services/auth.service';
import { AttendeeType } from '../../models/members.model';
import { BookingStatusUpdateRequest } from '../../models/booking.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../modules/store/states/app.state';
import * as UpcomingPageActions from '../../modules/store/actions/upcoming-page.actions';
import {
  getSelectedUpcomingBooking,
  selectUpcomingBookings,
} from '../../modules/store/selectors/upcoming-page.selectors';
@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent {
  seeDetails = false;
  selectedBooking$: Observable<Booking | undefined> = this.store.select(
    getSelectedUpcomingBooking
  );
  status = BookingStatus;
  userRoles = UserRoles;
  attendeeType = AttendeeType;
  currentUser = this.authService.currentUser;
  bookings$: Observable<Booking[]> | undefined;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.getBookings();
    this.listenBookings();
  }
  ngOnDestroy() {
    this.store.dispatch(UpcomingPageActions.clearSelectedUpcomingBooking());
  }
  getBookings() {
    this.store.dispatch(
      UpcomingPageActions.loadUpcomingBookings({
        entityNo: this.currentUser.entityNo,
      })
    );
  }
  listenBookings() {
    this.bookings$ = this.store.select(selectUpcomingBookings);
  }
  enableDetails(event: { booking: Booking }) {
    this.seeDetails = true;
    this.store.dispatch(
      UpcomingPageActions.selectUpcomingBooking({
        booking: event.booking,
      })
    );
  }
  cancelBooking(event: {
    bookingId: number;
    booking: BookingStatusUpdateRequest;
  }) {
    if (event.bookingId) {
      this.store.dispatch(
        UpcomingPageActions.cancelUpcomingBooking({
          booking: event.booking,
          bookingId: event.bookingId,
        })
      );
    }
  }
  identify(index: number, item: Booking) {
    return item.id;
  }
}
