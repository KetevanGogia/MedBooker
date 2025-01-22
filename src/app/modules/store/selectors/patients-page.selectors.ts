import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsPage } from '../states/patients-page.state';
const selectPatientsPageState =
  createFeatureSelector<PatientsPage>('patientsPage');
export const selectPatients = createSelector(
  selectPatientsPageState,
  (state) => {
    return state.patients;
  }
);
export const getSelectedPatient = createSelector(
  selectPatientsPageState,
  (state) => state.selectedPatient
);
// export const getSearchedPatient = createSelector(
//   selectPatientsPageState,
//   (state) => {
//     return state.searchedPatient;
//   }
// );
