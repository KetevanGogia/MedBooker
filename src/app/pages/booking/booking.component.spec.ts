import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbCardModule,
  NbThemeModule,
  NbTimepickerModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Practitioner, UserRoles } from 'src/app/models/members.model';
import { bookingPageReducer } from 'src/app/modules/store/reducers/booking-page.reducer';
import { initialBookingPageState } from 'src/app/modules/store/states/booking-page.state';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as BookingPageActions from '../../modules/store/actions/booking-page.actions';
import { BookingComponent } from './booking.component';
const doctor: Practitioner = {
  entityNo: UserRoles.Provider,
  firstName: 'doctor',
  lastName: 'doctor',
  practiceName: 'neurosurgeon',
  practiceNo: '123',
};
describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockDoctor$: Observable<Practitioner | undefined>;
  beforeEach(async () => {
    mockDoctor$ = of(doctor);
    await TestBed.configureTestingModule({
      declarations: [BookingComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        NbCardModule,
        NbThemeModule.forRoot(),
        NbTimepickerModule,
        NbDatepickerModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load doctor', () => {
    const action = BookingPageActions.getDoctorSuccess;
    const state = bookingPageReducer(
      initialBookingPageState,
      action({ doctor })
    );
    expect(state).toEqual({ doctor });
  });
  it('should render doctor', () => {
    fixture.componentInstance.doctor$ = mockDoctor$;
    fixture.detectChanges();
    const deCard = fixture.debugElement.query(By.css('#doctor'));
    expect(deCard).toBeTruthy();
  });
});
