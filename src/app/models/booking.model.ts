import { Attendee } from './members.model';
export enum BookingStatus {
  Confirmed = 'CONFIRMED',
  Tentative = 'TENTATIVE',
  Declined = 'DECLINED',
  Cancelled = 'CANCELLED',
}
//A scheduled event/booking
export interface Booking {
  attendees: Attendee[];
  description: string;
  endTime: string;
  id: number;
  startTime: string;
  status: BookingStatus;
  statusComment: string;
  title: string;
  practiceName?: string;
}
//Request to book a single or recurrent event
export interface BookingRequest {
  attendees: Attendee[]; //currentuser as Attendee object (who is booking, who is being booked)
  description: string;
  endDate: string;
  id?: number;
  organiser: number;
  startDate: string;
  title?: string;
}
//Response to a query for a booking/booking series
export interface BookingResponse {
  bookingMap: { [key: string]: Booking[] };
  endDate: string;
  startDate: string;
}
export interface BookingStatusUpdateRequest {
  bookingStatus: BookingStatus;
  comment: string;
  includeDependent: boolean;
}
export interface Position {
  lat: number;
  lng: number;
}
