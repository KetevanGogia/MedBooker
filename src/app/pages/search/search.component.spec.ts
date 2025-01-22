import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BookEntityCardComponent } from 'src/app/components/book-entity-card/book-entity-card.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { Practitioner, UserRoles } from 'src/app/models/members.model';
import { searchPageReducer } from 'src/app/modules/store/reducers/search-page.reducer';
import { initialSearchPageState } from 'src/app/modules/store/states/search-page.state';
import * as SearchPageActions from '../../modules/store/actions/search-page.actions';

import { SearchComponent } from './search.component';

const doctors: Practitioner[] = [
  {
    entityNo: UserRoles.Provider,
    firstName: 'doctor1',
    lastName: 'doctor1',
    practiceName: 'neurosurgeon',
    practiceNo: '123',
  },
  {
    entityNo: UserRoles.Provider,
    firstName: 'doctor2',
    lastName: 'doctor2',
    practiceName: 'cardiosurgeon',
    practiceNo: '124',
  },
];
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockDoctors$: Observable<Practitioner[]>;
  beforeEach(async () => {
    mockDoctors$ = of(doctors);
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, MapComponent, BookEntityCardComponent],
      imports: [
        StoreModule.forRoot({}),
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load doctors', () => {
    const action = SearchPageActions.loadDoctorsSuccess;
    const state = searchPageReducer(
      initialSearchPageState,
      action({ doctors })
    );
    expect(state).toEqual({ doctors, selectedDoctor: undefined });
  });
  it('should render doctors', () => {
    fixture.componentInstance.doctors$ = mockDoctors$;
    fixture.detectChanges();
    const deCard = fixture.debugElement.queryAll(
      By.css('app-book-entity-card')
    );
    expect(deCard.length).toBe(2);
  });
});
