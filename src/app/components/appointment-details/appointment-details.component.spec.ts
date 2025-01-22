import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import {
  Booking,
  BookingStatus,
  BookingStatusUpdateRequest,
} from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { AppointmentDetailsComponent } from './appointment-details.component';
const selectedBooking: Booking = {
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
  endTime: '2023-03-30T10:30:38.012Z',
  id: 1,
  startTime: '2023-03-30T10:30:38.012Z',
  status: BookingStatus.Confirmed,
  statusComment: '',
  title: '',
};
const booking: BookingStatusUpdateRequest = {
  bookingStatus: BookingStatus.Confirmed,
  comment: '',
  includeDependent: true,
};
const bookingId = 2;
describe('AppointmentDetailsComponent', () => {
  let component: AppointmentDetailsComponent;
  let fixture: ComponentFixture<AppointmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentDetailsComponent, IsoDatePipe],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatCardModule,
      ],
      providers: [AuthService],
    })
      .overrideComponent(AppointmentDetailsComponent, {
        set: { changeDetection: AppointmentDetailsComponent.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct selected booking', () => {
    fixture.componentInstance.selectedBooking = selectedBooking;
    fixture.detectChanges();
    expect(
      fixture.componentInstance.selectedBooking.attendees[0].entity.firstName
    ).toContain('patient');
  });
  it('should render date in div', () => {
    fixture.componentInstance.selectedBooking = selectedBooking;
    fixture.detectChanges();
    const deD = fixture.debugElement.query(By.css('#date'));
    console.log(deD);
    expect(deD.nativeElement.textContent).toContain('Thu, 30 March');
  });
  it('should emit onCancelBooking event with correct bookingId and booking', () => {
    spyOn(component.onCancelBooking, 'emit');
    component.cancelBooking(bookingId, booking);
    expect(component.onCancelBooking.emit).toHaveBeenCalledWith({
      bookingId,
      booking,
    });
  });
});
