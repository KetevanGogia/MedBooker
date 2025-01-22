import { createAction, props } from '@ngrx/store';
import { Booking, BookingRequest } from 'src/app/models/booking.model';
import { Practitioner } from 'src/app/models/members.model';

export const loadDoctors = createAction('[API] load doctors');
export const loadDoctorsSuccess = createAction(
  '[API] load doctors success',
  props<{ doctors: Practitioner[] }>()
);
export const loadDoctorsFail = createAction(
  '[API] load doctors fail',
  props<{ error: string }>()
);
export const searchDoctor = createAction(
  '[API] search doctor',
  props<{
    firstName: string | null | undefined;
    lastName: string | null | undefined;
  }>()
);
export const searchDoctorSuccess = createAction(
  '[API] search doctor success',
  props<{ searchedDoctor: Practitioner[] }>()
);
export const searchedDoctorFail = createAction(
  '[API] search doctor fail',
  props<{ error: string }>()
);
