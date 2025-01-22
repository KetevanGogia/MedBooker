import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { provideMockStore } from '@ngrx/store/testing';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import * as DashboardPageActions from '../../modules/store/actions/dashboard-page.actions';
import { dashboardPageReducer } from 'src/app/modules/store/reducers/dashboard-page.reducer';
import { initialDashboardPageState } from 'src/app/modules/store/states/dashboard-page.state';
import { Booking, BookingStatus } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BookingRequestCardComponent } from 'src/app/components/booking-request-card/booking-request-card.component';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { NamePipe } from 'src/app/pipes/name.pipe';
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
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockBookings$: Observable<Booking[]>;
  beforeEach(async () => {
    mockBookings$ = of(bookings);
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        BookingRequestCardComponent,
        IsoDatePipe,
        NamePipe,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        StoreModule.forRoot({}),
        MatGridListModule,
        MatCardModule,
      ],
      providers: [AuthService, provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load bookings into state', () => {
    const action = DashboardPageActions.loadTentativeBookingsSuccess;
    const state = dashboardPageReducer(
      initialDashboardPageState,
      action({ bookings })
    );
    expect(state).toEqual({ tentativeBookings: bookings });
  });

  it('should update booking status', () => {
    const action = DashboardPageActions.updateTentativeBookingSuccess;
    const state = dashboardPageReducer(
      initialDashboardPageState,
      action({ booking: bookings[0] })
    );
    expect(state).toEqual({ tentativeBookings: [] });
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
