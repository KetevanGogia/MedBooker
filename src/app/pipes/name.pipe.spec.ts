import { Attendee, AttendeeType, UserRoles } from '../models/members.model';
import { NamePipe } from './name.pipe';
const attendees: Attendee[] = [
  {
    attendeeType: AttendeeType.Patient,
    entity: {
      entityNo: UserRoles.Patient,
      firstName: 'patient',
      lastName: 'patient',
    },
    entityNo: UserRoles.Patient,
  },
  {
    attendeeType: AttendeeType.Provider,
    entity: {
      entityNo: UserRoles.Provider,
      firstName: 'provider',
      lastName: 'provider',
    },
    entityNo: UserRoles.Provider,
  },
];
describe('NamePipe', () => {
  const pipe = new NamePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform an array of attendees to a name string of patient of attendeetype is patient', () => {
    const result = pipe.transform(attendees, AttendeeType.Patient);
    expect(result).toBe('patient patient');
  });
  it('should transform an array of attendees to a name string of provider of attendeetype is provider', () => {
    const result = pipe.transform(attendees, AttendeeType.Provider);
    expect(result).toBe('provider provider');
  });
  it('should return undefined if the array of attendees is undefined', () => {
    const result = pipe.transform(undefined, AttendeeType.Patient);
    expect(result).toBe(undefined);
  });
});
