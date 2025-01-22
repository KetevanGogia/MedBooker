import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BookPatientCardComponent } from 'src/app/components/book-patient-card/book-patient-card.component';
import { Entity, UserRoles } from 'src/app/models/members.model';
import { patientsPageReducer } from 'src/app/modules/store/reducers/patients-page.reducer';
import { initialPatientsPageState } from 'src/app/modules/store/states/patients-page.state';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as PatientsPageActions from '../../modules/store/actions/patients-page.actions';

import { PatientsComponent } from './patients.component';

const patients: Entity[] = [
  { entityNo: UserRoles.Patient, firstName: 'patient1', lastName: 'patient1' },
  { entityNo: UserRoles.Patient, firstName: 'patient2', lastName: 'patient2' },
];
describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;
  let mockPatients$: Observable<Entity[]>;
  beforeEach(async () => {
    mockPatients$ = of(patients);
    await TestBed.configureTestingModule({
      declarations: [PatientsComponent, BookPatientCardComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load patients', () => {
    const action = PatientsPageActions.loadPatientsSuccess;
    const state = patientsPageReducer(
      initialPatientsPageState,
      action({ patients })
    );
    expect(state).toEqual({ patients, selectedPatient: undefined });
  });
  it('should search patient correctly', () => {
    const action = PatientsPageActions.searchPatientSuccess;
    const state = patientsPageReducer(
      initialPatientsPageState,
      action({ patient: [patients[0]] })
    );
    expect(state).toEqual({
      patients: [patients[0]],
      selectedPatient: undefined,
    });
  });
  it('should render patients', () => {
    fixture.componentInstance.patients$ = mockPatients$;
    fixture.detectChanges();
    const deCard = fixture.debugElement.queryAll(
      By.css('app-book-patient-card')
    );
    expect(deCard.length).toBe(2);
  });
});
