import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendeeType } from 'src/app/models/members.model';
import { BookingStatus, Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserRoles } from 'src/app/models/members.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/modules/store/states/app.state';
import * as DashboardPageActions from '../../modules/store/actions/dashboard-page.actions';
import { selectTentativeBookings } from 'src/app/modules/store/selectors/dashboard-page.selectors';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  status = BookingStatus;
  attendeeType = AttendeeType;
  userRoles = UserRoles;
  user = this.authService.currentUser;
  bookings$: Observable<Booking[] | undefined> | undefined;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.retrieveTentativeBookings();
    this.listenBookings();
  }
  retrieveTentativeBookings() {
    this.store.dispatch(
      DashboardPageActions.loadTentativeBookings({
        entityNo: this.authService.currentUser.entityNo,
      })
    );
  }
  listenBookings() {
    this.bookings$ = this.store.select(selectTentativeBookings);
  }
  acceptRejectBtns(event: {
    bookingId: number | undefined;
    status: BookingStatus;
  }) {
    if (event.bookingId)
      this.store.dispatch(
        DashboardPageActions.updateTentativeBooking({
          bookingId: event.bookingId,
          status: event.status,
        })
      );
  }
  identify(index: number, item: Booking) {
    return item.id;
  }
}
