export enum AttendeeType {
  Provider = 'PROVIDER',
  Patient = 'PATIENT',
}
export enum UserRoles {
  Provider = 1100000111,
  Patient = 1000000001,
}
//a specific member entity provider or patient
export interface Entity {
  entityNo: number;
  firstName: string;
  lastName: string;
}
//doctor
export interface Practitioner extends Entity {
  practiceName: string;
  practiceNo: string;
}
//A person that has been added to the booking
export interface Attendee {
  attendeeType: AttendeeType;
  entity: Entity;
  entityNo: number;
}
