import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Booking, BookingStatus } from 'src/app/models/booking.model';
import { AttendeeType } from 'src/app/models/members.model';
import { IsoDatePipe } from 'src/app/pipes/iso-date.pipe';
import { NamePipe } from 'src/app/pipes/name.pipe';

import { BookingRequestCardComponent } from './booking-request-card.component';
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
describe('BookingRequestCardComponent', () => {
  let component: BookingRequestCardComponent;
  let fixture: ComponentFixture<BookingRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingRequestCardComponent, IsoDatePipe, NamePipe],
      imports: [MatCardModule],
    })
      .overrideComponent(BookingRequestCardComponent, {
        set: { changeDetection: BookingRequestCardComponent.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BookingRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct booking', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    expect(
      fixture.componentInstance.booking.attendees[0].entity.firstName
    ).toContain('patient');
  });
  it('should render patient name', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    const deD = fixture.debugElement.query(By.css('#date'));
    console.log(deD);
    expect(deD.nativeElement.textContent).toContain('Thu, 30 March');
  });
  it('should emit onStatusChange event with correct bookingId and booking status', () => {
    const bookingId = 2;
    const bookingStatus = BookingStatus.Confirmed;
    spyOn(component.onStatusChange, 'emit');
    component.acceptRejectBtns(bookingId, bookingStatus);
    expect(component.onStatusChange.emit).toHaveBeenCalledWith({
      bookingId,
      status: bookingStatus,
    });
  });
});
