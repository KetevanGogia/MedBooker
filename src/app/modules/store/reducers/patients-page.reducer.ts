import { createReducer, on } from '@ngrx/store';
import { initialPatientsPageState } from '../states/patients-page.state';
import * as PatientsPageActions from '../actions/patients-page.actions';
export const patientsPageReducer = createReducer(
  initialPatientsPageState,
  on(PatientsPageActions.loadPatientsSuccess, (state, action) => {
    return {
      ...state,
      patients: action.patients,
    };
  }),
  on(PatientsPageActions.selectPatient, (state, action) => {
    return {
      ...state,
      selectedPatient: action.patient,
    };
  }),
  on(PatientsPageActions.searchPatientSuccess, (state, action) => {
    return {
      ...state,
      patients: action.patient,
    };
  }),
  on(PatientsPageActions.createBookingSuccess, (state, action) => {
    console.log(state);
    return {
      ...state,
      selectedPatient: undefined,
    };
  }),
  on(PatientsPageActions.clearSelectedPatient, (state, action) => {
    return {
      ...state,
      selectedPatient: undefined,
    };
  })
);
