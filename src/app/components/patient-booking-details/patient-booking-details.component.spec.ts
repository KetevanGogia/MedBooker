import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NbTimepickerModule, NbDatepickerModule } from '@nebular/theme';
import { NbThemeModule } from '@nebular/theme';
import { Entity, UserRoles } from 'src/app/models/members.model';

import { PatientBookingDetailsComponent } from './patient-booking-details.component';
const patient: Entity = {
  entityNo: UserRoles.Patient,
  firstName: 'patient',
  lastName: 'patient',
};
const date = new Date().toString();
describe('PatientBookingDetailsComponent', () => {
  let component: PatientBookingDetailsComponent;
  let fixture: ComponentFixture<PatientBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientBookingDetailsComponent],
      imports: [
        NbTimepickerModule,
        NbDatepickerModule.forRoot(),
        ReactiveFormsModule,
        NbThemeModule.forRoot(),
      ],
    })
      .overrideComponent(PatientBookingDetailsComponent, {
        set: { changeDetection: PatientBookingDetailsComponent.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PatientBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct entity', () => {
    fixture.componentInstance.chosenPatient = patient;
    fixture.detectChanges();
    expect(fixture.componentInstance.chosenPatient.firstName).toContain(
      'patient'
    );
  });
  it('should render name in span', () => {
    fixture.componentInstance.chosenPatient = patient;
    fixture.detectChanges();
    const deS = fixture.debugElement.query(By.css('#name'));
    console.log(deS);
    expect(deS.nativeElement.textContent).toContain('patient');
  });
  it('should emit newBooking event with correct entity', () => {
    spyOn(component.newBooking, 'emit');
    component.form.setValue({ startDate: date });
    component.bookPatient(patient);
    expect(component.newBooking.emit).toHaveBeenCalledWith({
      chosenPatient: patient,
      date,
    });
  });
  it('should create the form with a required startDate control', () => {
    expect(component.form.contains('startDate')).toBeTrue();
    const control = component.form.get('startDate');
    expect(control?.hasValidator(Validators.required)).toBeTrue();
  });
  it('should be invalid if the startDate control is empty', () => {
    component.form.setValue({ startDate: '' });
    expect(component.form.valid).toBeFalse();
  });

  it('should be valid if the startDate control has a value', () => {
    component.form.setValue({ startDate: new Date().toISOString() });
    expect(component.form.valid).toBeTrue();
  });
});
