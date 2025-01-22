import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { UserRoles } from 'src/app/models/members.model';
import { BookingService } from 'src/app/services/booking.service';
import { BookingStatus } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as RequestsPageActions from '../../modules/store/actions/requests-page.actions';
import { selectRequestBookings } from 'src/app/modules/store/selectors/requests-page.selectors';
@Component({
  selector: 'app-consultation-request',
  templateUrl: './consultation-request.component.html',
  styleUrls: ['./consultation-request.component.scss'],
})
export class ConsultationRequestComponent {
  userRoles = UserRoles;
  bookings$: Observable<Booking[] | undefined> = this.store.select(
    selectRequestBookings
  );
  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private store: Store
  ) {}
  ngOnInit() {
    this.getBookings();
  }
  getBookings() {
    this.store.dispatch(
      RequestsPageActions.loadBookings({
        entityNo: this.authService.currentUser.entityNo,
        date: new Date().toISOString(),
      })
    );
  }
  acceptRejectBtns(event: {
    bookingId: number | undefined;
    status: BookingStatus;
  }) {
    if (event.bookingId) {
      this.store.dispatch(
        RequestsPageActions.updateBooking({
          bookingId: event.bookingId,
          status: event.status,
        })
      );
    }
  }
  identify(index: number, item: Booking) {
    return item.id;
  }
}
