import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppointmentCardComponent } from 'src/app/components/appointment-card/appointment-card.component';
import { Booking, BookingStatus } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { healthRecordsReducer } from 'src/app/modules/store/reducers/health-records.reducer';
import { initialHealthRecordsState } from 'src/app/modules/store/states/health-records.state';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as HealthPageActions from '../../modules/store/actions/health-records.actions';
import { HealthRecordsComponent } from './health-records.component';
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
describe('HealthRecordsComponent', () => {
  let component: HealthRecordsComponent;
  let fixture: ComponentFixture<HealthRecordsComponent>;
  let mockBookings$: Observable<Booking[]> | undefined;
  beforeEach(async () => {
    mockBookings$ = of(bookings);
    await TestBed.configureTestingModule({
      declarations: [
        HealthRecordsComponent,
        AppointmentCardComponent,
        IsoDatePipe,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        StoreModule.forRoot({}),
        MatGridListModule,
        MatCardModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load health records', () => {
    const action = HealthPageActions.loadPastBookingsSuccess;
    const state = healthRecordsReducer(
      initialHealthRecordsState,
      action({ bookings })
    );
    expect(state).toEqual({
      pastBookings: bookings,
      selectedPastBooking: undefined,
    });
  });
  it('should render bookings', () => {
    fixture.componentInstance.bookings$ = mockBookings$;
    fixture.detectChanges();
    const deCard = fixture.debugElement.queryAll(
      By.css('app-appointment-card')
    );
    expect(deCard.length).toBe(1);
  });
});
