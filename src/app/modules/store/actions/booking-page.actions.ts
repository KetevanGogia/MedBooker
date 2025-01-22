import { createAction, props } from '@ngrx/store';
import { Practitioner } from 'src/app/models/members.model';

export const getDoctor = createAction(
  '[API] get doctor',
  props<{ entityNo: number }>()
);
export const getDoctorSuccess = createAction(
  '[API] get doctor success',
  props<{ doctor: Practitioner }>()
);
export const getDoctorFail = createAction(
  '[API] get doctor fail',
  props<{ error: string }>()
);
export const bookDoctor = createAction(
  '[API] book doctor',
  props<{ doctor: Practitioner; startDate: string | null | undefined }>()
);
