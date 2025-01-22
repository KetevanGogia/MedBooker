import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Practitioner } from 'src/app/models/members.model';
import { selectDoctorForBooking } from 'src/app/modules/store/selectors/booking-page.selector';
import { AppState } from 'src/app/modules/store/states/app.state';
import { AuthService } from 'src/app/services/auth.service';
import * as BookingPageActions from '../../modules/store/actions/booking-page.actions';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  doctor$: Observable<Practitioner | undefined> = this.store.select(
    selectDoctorForBooking
  );
  currentUser = this.authService.currentUser;
  form = this.fb.group({
    startDate: this.fb.control('', [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.loadDoctor();
  }
  loadDoctor() {
    const entityNo = this.route.snapshot.params['id'];
    this.store.dispatch(BookingPageActions.getDoctor({ entityNo: entityNo }));
  }
  bookDoctor(doctor: Practitioner) {
    const startDate = this.form.value.startDate;
    this.store.dispatch(
      BookingPageActions.bookDoctor({ doctor: doctor, startDate: startDate })
    );
  }
}
