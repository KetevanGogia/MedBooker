import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Practitioner, UserRoles } from 'src/app/models/members.model';

import { BookEntityCardComponent } from './book-entity-card.component';
const doctor: Practitioner = {
  entityNo: UserRoles.Provider,
  firstName: 'doctor1',
  lastName: 'doctor1',
  practiceName: 'neurosurgeon',
  practiceNo: '123',
};
describe('BookEntityCardComponent', () => {
  let component: BookEntityCardComponent;
  let fixture: ComponentFixture<BookEntityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookEntityCardComponent],
    })
      .overrideComponent(BookEntityCardComponent, {
        set: { changeDetection: BookEntityCardComponent.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BookEntityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct doctor', () => {
    fixture.componentInstance.doctor = doctor;
    fixture.detectChanges();
    expect(fixture.componentInstance.doctor.firstName).toContain('doctor1');
  });
  it('should render doctor name', () => {
    fixture.componentInstance.doctor = doctor;
    fixture.detectChanges();
    const deD = fixture.debugElement.query(By.css('#name'));
    console.log(deD);
    expect(deD.nativeElement.textContent).toContain('doctor1');
  });
  it('should emit onBook event with correct entityNo', () => {
    const entityNo = UserRoles.Provider;
    spyOn(component.onBook, 'emit');
    component.book(entityNo);
    expect(component.onBook.emit).toHaveBeenCalledWith({ entityNo });
  });
});
