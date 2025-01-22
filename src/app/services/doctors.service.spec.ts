import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DoctorsService } from './doctors.service';
import { environment } from 'src/environments/environment';
describe('DoctorsService', () => {
  let service: DoctorsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(DoctorsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('retrieveAllDoctors', () => {
    it('should retrive all patients with get request', () => {
      service.retrieveAllDoctors().subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/practitioner/`
      );
      expect(request.request.method).toEqual('GET');
      httpTestingController.verify();
    });
  });
  describe('retrieveSingleDoctor', () => {
    it('should retrive one member with get request', () => {
      service.retrieveSingleDoctor(123456).subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/practitioner/123456`
      );
      expect(request.request.method).toEqual('GET');
    });
  });
  describe('searchDoctor', () => {
    it('should find one member with get request', () => {
      service.searchDoctor().subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/practitioner/search`
      );
      expect(request.request.method).toEqual('GET');
    });
  });
});
