import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Booking, BookingStatus } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { AppointmentCardComponent } from './appointment-card.component';
const booking: Booking = {
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
describe('AppointmentCardComponent', () => {
  let component: AppointmentCardComponent;
  let fixture: ComponentFixture<AppointmentCardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentCardComponent, IsoDatePipe],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatCardModule,
      ],
      providers: [AuthService],
    })
      .overrideComponent(AppointmentCardComponent, {
        set: { changeDetection: AppointmentCardComponent.Default },
      })
      .compileComponents();
    fixture = TestBed.createComponent(AppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct booking object', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    expect(
      fixture.componentInstance.booking.attendees[0].entity.firstName
    ).toContain('patient');
  });
  it('should render date in div', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    const deD = fixture.debugElement.query(By.css('#date'));
    console.log(deD);
    expect(deD.nativeElement.textContent).toContain('Thu, 30 March');
    // const deH = fixture.debugElement.query(By.css('h6'));
    // expect(deH.nativeElement.textContent).toContain('patient patient');
  });
  it('should emit onEnableBooking event with the correct booking object', () => {
    spyOn(component.onEnableDetails, 'emit');
    component.enableDetails(booking);
    expect(component.onEnableDetails.emit).toHaveBeenCalledWith({ booking });
  });
});
