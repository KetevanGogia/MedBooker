import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { DoctorsService } from 'src/app/services/doctors.service';
import * as SearchPageActions from '../actions/search-page.actions';
@Injectable({
  providedIn: 'root',
})
export class SearchPageEffects {
  loadDoctors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchPageActions.loadDoctors),
      mergeMap((action) => {
        return this.doctorsService.retrieveAllDoctors().pipe(
          map((doctors) =>
            SearchPageActions.loadDoctorsSuccess({ doctors: doctors })
          ),
          catchError((error) =>
            of(SearchPageActions.loadDoctorsFail({ error: error }))
          )
        );
      })
    );
  });
  searchDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchPageActions.searchDoctor),
      mergeMap((action) => {
        if (!action.firstName && !action.lastName) {
          return this.doctorsService.retrieveAllDoctors();
        }
        return this.doctorsService.searchDoctor(
          action.firstName || '',
          action.lastName || ''
        );
      }),
      map((doctor) =>
        SearchPageActions.searchDoctorSuccess({ searchedDoctor: doctor })
      ),
      catchError((error) =>
        of(SearchPageActions.searchedDoctorFail({ error: error }))
      )
    );
  });
  constructor(
    private actions$: Actions,
    private doctorsService: DoctorsService
  ) {}
}
