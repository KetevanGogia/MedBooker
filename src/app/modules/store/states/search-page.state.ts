import { Practitioner } from 'src/app/models/members.model';

export interface SearchPage {
  doctors: Practitioner[];
  selectedDoctor: Practitioner | undefined;
}
export const initialSearchPageState: SearchPage = {
  doctors: [],
  selectedDoctor: undefined,
};
