import { TestBed } from '@angular/core/testing';
import { Booking, BookingStatus } from '../models/booking.model';
import { AttendeeType, Practitioner, UserRoles } from '../models/members.model';

import { MapperService } from './mapper.service';
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
    endTime: '2023-03-30T08:50:33.148Z',
    id: 1,
    startTime: '2023-03-30T08:50:33.148Z',
    status: BookingStatus.Tentative,
    statusComment: '',
    title: '',
  },
];
const doctors: Practitioner[] = [
  {
    entityNo: UserRoles.Provider,
    firstName: 'doctor1',
    lastName: 'doctor1',
    practiceName: 'neurosurgeon',
    practiceNo: '123',
  },
];
describe('MapperService', () => {
  let service: MapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return an array of entity numbers', () => {
    const expectedOutput = [1000000001];
    expect(service.getEntityNos(bookings, AttendeeType.Patient)).toEqual(
      expectedOutput
    );
  });
  it('should merge practice names into bookings', () => {
    const expectedOutput = [
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
        endTime: '2023-03-30T08:50:33.148Z',
        id: 1,
        startTime: '2023-03-30T08:50:33.148Z',
        status: BookingStatus.Tentative,
        statusComment: '',
        title: '',
        practiceName: 'neurosurgeon',
      },
    ];
    expect(service.mergeData(bookings, doctors)).toEqual(expectedOutput);
  });
});
