import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [MembersService],
    });
    service = TestBed.inject(MembersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('retrieveAllPatients', () => {
    it('should retrive all patients with get request', () => {
      service.retrieveAllPatients().subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/member/`
      );
      expect(request.request.method).toEqual('GET');
      httpTestingController.verify();
    });
  });
  describe('retrieveSinglePatient', () => {
    it('should retrive one member with get request', () => {
      service.retrieveSinglePatient(123456).subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/member/123456`
      );
      expect(request.request.method).toEqual('GET');
    });
  });
  describe('searchPatient', () => {
    it('should find one member with get request', () => {
      service.searchPatients().subscribe();
      const request = httpTestingController.expectOne(
        `${environment.BASE_URL_API}/api/v1/member/search`
      );
      expect(request.request.method).toEqual('GET');
    });
  });
});
