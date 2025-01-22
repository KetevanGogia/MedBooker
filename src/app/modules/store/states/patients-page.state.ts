import { Entity } from 'src/app/models/members.model';

export interface PatientsPage {
  patients: Entity[];
  selectedPatient: Entity | undefined;
}
export const initialPatientsPageState: PatientsPage = {
  patients: [],
  selectedPatient: undefined,
};
