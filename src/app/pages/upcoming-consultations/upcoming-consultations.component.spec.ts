import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { Booking, BookingStatus } from '../../models/booking.model';
import { AttendeeType } from '../../models/members.model';
import { IsoDatePipe } from '../../pipes/iso-date.pipe';
import { AuthService } from '../../services/auth.service';

import { UpcomingConsultationsComponent } from './upcoming-consultations.component';

describe('UpcomingConsultationsComponent', () => {
  let component: UpcomingConsultationsComponent;
  let fixture: ComponentFixture<UpcomingConsultationsComponent>;
  let mockAuthService: AuthService;
  let mockBookings$: Observable<Booking[]> | undefined;
  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    mockBookings$ = of([
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
        status: BookingStatus.Confirmed,
        statusComment: '',
        title: '',
      },
      {
        attendees: [
          {
            attendeeType: AttendeeType.Patient,
            entity: {
              entityNo: 1000000001,
              firstName: 'patient2',
              lastName: 'patient2',
            },
            entityNo: 1000000001,
          },
          {
            attendeeType: AttendeeType.Provider,
            entity: {
              entityNo: 1100000111,
              firstName: 'doctor2',
              lastName: 'doctor2',
            },
            entityNo: 1100000111,
          },
        ],
        description: '',
        endTime: new Date().toISOString(),
        id: 1,
        startTime: new Date().toISOString(),
        status: BookingStatus.Confirmed,
        statusComment: '',
        title: '',
      },
    ]);
    await TestBed.configureTestingModule({
      declarations: [
        UpcomingConsultationsComponent,
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
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render upcoming consultations', () => {
    fixture.componentInstance.bookings$ = mockBookings$;
    fixture.detectChanges();
    const deCard = fixture.debugElement.queryAll(
      By.css('app-appointment-card')
    );
    expect(deCard.length).toBe(2);
  });
});
