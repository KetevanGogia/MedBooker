import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { BookingStatus } from '../models/booking.model';
import { Attendee, UserRoles } from '../models/members.model';
describe('BookingService', () => {
  let service: BookingService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BookingService],
    });
    service = TestBed.inject(BookingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getBookingsForEntity', () => {
    it('should make request on correct url and make get request', () => {
      service.retriveBooking(111111).subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/booking/attendee/${111111}`
      );
      expect(request.request.method).toEqual('GET');
      httpTestingController.verify();
    });
  });
  describe('updateBooking', () => {
    it('should make a request on correct url and make a put request', () => {
      service
        .updateBooking(1, {
          bookingStatus: BookingStatus.Confirmed,
          comment: '',
          includeDependent: true,
        })
        .subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/booking/1/status`
      );
      expect(request.request.method).toEqual('PUT');
      httpTestingController.verify();
    });
  });
  describe('createBooking', () => {
    it('should make a request on correct url and make a post request', () => {
      service
        .createBooking({
          attendees: [] as Attendee[],
          description: '',
          endDate: new Date().toISOString(),
          organiser: UserRoles.Patient,
          startDate: new Date().toISOString(),
        })
        .subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/booking/`
      );
      expect(request.request.method).toEqual('POST');
    });
  });
});
