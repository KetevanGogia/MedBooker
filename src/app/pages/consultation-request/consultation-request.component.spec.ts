import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BookingRequestCardComponent } from 'src/app/components/booking-request-card/booking-request-card.component';
import { Booking, BookingStatus } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { requestsPageReducer } from 'src/app/modules/store/reducers/requests-page.reducer';
import { initialRequestsPageState } from 'src/app/modules/store/states/requests-page.state';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { NamePipe } from 'src/app/pipes/name.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as RequestsPageActions from '../../modules/store/actions/requests-page.actions';
import { ConsultationRequestComponent } from './consultation-request.component';
const bookings: Booking[] = [
  {
    attendees: [
      {
        attendeeType: AttendeeType.Patient,
        entity: {
          entityNo: 1000000001,
          firstName: 'patient',
          lastName: 'patient',
        },
        entityNo: 1000000001,
      },
      {
        attendeeType: AttendeeType.Provider,
        entity: {
          entityNo: 1100000111,
          firstName: 'doctor',
          lastName: 'doctor',
        },
        entityNo: 1100000111,
      },
    ],
    description: '',
    endTime: new Date().toISOString(),
    id: 1,
    startTime: new Date().toISOString(),
    status: BookingStatus.Tentative,
    statusComment: '',
    title: '',
  },
];
describe('ConsultationRequestComponent', () => {
  let component: ConsultationRequestComponent;
  let fixture: ComponentFixture<ConsultationRequestComponent>;
  let mockBookings$: Observable<Booking[]>;
  beforeEach(async () => {
    mockBookings$ = of(bookings);
    await TestBed.configureTestingModule({
      declarations: [
        ConsultationRequestComponent,
        BookingRequestCardComponent,
        IsoDatePipe,
        NamePipe,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        MatCardModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load booking requests', () => {
    const action = RequestsPageActions.loadBookingsSuccess;
    const state = requestsPageReducer(
      initialRequestsPageState,
      action({ bookings })
    );
    expect(state).toEqual({ bookings, selectedBooking: undefined });
  });
  it('should update booking request status', () => {
    const action = RequestsPageActions.updateBookingSuccess;
    const state = requestsPageReducer(
      initialRequestsPageState,
      action({ booking: bookings[0] })
    );
    expect(state).toEqual({ bookings: [], selectedBooking: undefined });
  });
  it('should render bookings', () => {
    fixture.componentInstance.bookings$ = mockBookings$;
    fixture.detectChanges();
    const deCard = fixture.debugElement.queryAll(
      By.css('app-booking-request-card')
    );
    expect(deCard.length).toBe(1);
  });
});
