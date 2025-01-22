import { Practitioner } from 'src/app/models/members.model';

export interface BookingPage {
  doctor: Practitioner | undefined;
}
export const initialBookingPageState: BookingPage = {
  doctor: undefined,
};
