import { createAction, props } from '@ngrx/store';
import { Booking, BookingRequest } from 'src/app/models/booking.model';
import { Entity } from 'src/app/models/members.model';

export const loadPatients = createAction('[API] load patients');
export const loadPatientsSuccess = createAction(
  '[API] load patients success',
  props<{ patients: Entity[] }>()
);
export const loadPatientsFail = createAction(
  '[API] load patients fail',
  props<{ error: string }>()
);
export const selectPatient = createAction(
  '[PatientsPage] select patient',
  props<{ patient: Entity }>()
);
export const searchPatient = createAction(
  '[API] search patient',
  props<{
    firstName: string | null | undefined;
    lastName: string | null | undefined;
  }>()
);
export const searchPatientSuccess = createAction(
  '[API] search patient success',
  props<{ patient: Entity[] }>()
);
export const searchedPatientFail = createAction(
  '[API] search patient fail',
  props<{ error: string }>()
);
export const createBooking = createAction(
  '[API] create booking',
  props<{ chosenPatient: Entity; date: string }>()
);
export const createBookingSuccess = createAction(
  '[API] create booking success',
  props<{ booking: Booking }>()
);
export const createBookingFail = createAction(
  '[API] create booking fail',
  props<{ error: string }>()
);
export const clearSelectedPatient = createAction(
  '[PatientsPage] clear selected patient'
);
