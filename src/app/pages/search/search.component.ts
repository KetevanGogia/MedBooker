import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Practitioner } from 'src/app/models/members.model';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as SearchPageActions from '../../modules/store/actions/search-page.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/modules/store/states/app.state';
import { selectDoctors } from 'src/app/modules/store/selectors/search-page.selector';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  form = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
  });
  doctors$: Observable<Practitioner[] | undefined> =
    this.store.select(selectDoctors);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.loadDoctors();
    this.listenForm();
  }
  loadDoctors() {
    this.store.dispatch(SearchPageActions.loadDoctors());
  }
  listenForm() {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        catchError(() => EMPTY)
      )
      .subscribe((formValue) => {
        if (!formValue.firstName && !formValue.lastName) {
          this.store.dispatch(SearchPageActions.loadDoctors());
        }
        this.store.dispatch(
          SearchPageActions.searchDoctor({
            firstName: formValue.firstName,
            lastName: formValue.lastName,
          })
        );
      });
  }
  book(event: { entityNo: number | undefined }) {
    this.router.navigate([`/booking/${event.entityNo}`]);
  }
  identify(index: number, item: Practitioner) {
    return item.entityNo;
  }
}
