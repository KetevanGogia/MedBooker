import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Entity, UserRoles } from 'src/app/models/members.model';

import { BookPatientCardComponent } from './book-patient-card.component';
const patient: Entity = {
  entityNo: UserRoles.Patient,
  firstName: 'patient',
  lastName: 'patient',
};
describe('BookPatientCardComponent', () => {
  let component: BookPatientCardComponent;
  let fixture: ComponentFixture<BookPatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookPatientCardComponent],
      imports: [MatCardModule],
    })
      .overrideComponent(BookPatientCardComponent, {
        set: { changeDetection: BookPatientCardComponent.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BookPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct patient', () => {
    fixture.componentInstance.patient = patient;
    fixture.detectChanges();
    expect(fixture.componentInstance.patient.firstName).toContain('patient');
  });
  it('should render patient name', () => {
    fixture.componentInstance.patient = patient;
    fixture.detectChanges();
    const deD = fixture.debugElement.query(By.css('#name'));
    console.log(deD);
    expect(deD.nativeElement.textContent).toContain('patient');
  });
  it('should emit onEnableBooking event with correct entity', () => {
    spyOn(component.onEnableBooking, 'emit');
    component.enableBooking(patient);
    expect(component.onEnableBooking.emit).toHaveBeenCalledWith({ patient });
  });
});
