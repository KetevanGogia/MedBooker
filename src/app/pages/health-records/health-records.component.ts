import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { UserRoles } from 'src/app/models/members.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/modules/store/states/app.state';
import * as HealthRecorsActions from '../../modules/store/actions/health-records.actions';
import { AuthService } from 'src/app/services/auth.service';
import {
  getSelectedPastBooking,
  selectPastBookings,
} from 'src/app/modules/store/selectors/health-records.selector';
@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
})
export class HealthRecordsComponent {
  seeDetails: boolean = false;
  selectedBooking$: Observable<Booking | undefined> = this.store.select(
    getSelectedPastBooking
  );
  bookings$: Observable<Booking[]> | undefined;
  currentUser = this.authService.currentUser;
  userRoles = UserRoles;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.getPreviousBookings();
    this.listenBookings();
  }
  ngOndestroy() {
    this.store.dispatch(HealthRecorsActions.clearSelectedPastBooking());
  }
  getPreviousBookings() {
    this.store.dispatch(
      HealthRecorsActions.loadPastBookings({
        entityNo: this.currentUser?.entityNo,
      })
    );
  }
  listenBookings() {
    this.bookings$ = this.store.select(selectPastBookings);
  }
  enableDetails(event: { booking: Booking }) {
    this.seeDetails = true;
    this.store.dispatch(
      HealthRecorsActions.selectPastBooking({
        booking: event.booking,
      })
    );
  }
  identify(index: number, item: Booking) {
    return item.id;
  }
}
