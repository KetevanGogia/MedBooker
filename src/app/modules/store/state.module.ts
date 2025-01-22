import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HealthRecordsEffects } from './effects/health-records.effects';
import { DashboardPageEffects } from './effects/dashboard-page.effects';
import { UpcomingPageEffects } from './effects/upcoming-page.effects';
import { PatientsPageEffects } from './effects/patient-page.effects';
import { RequestsPageEffects } from './effects/requests-page.effects';
import { SearchPageEffects } from './effects/search-page.effects';
import { BookingPageEffects } from './effects/booking-page.effects';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      HealthRecordsEffects,
      DashboardPageEffects,
      UpcomingPageEffects,
      PatientsPageEffects,
      RequestsPageEffects,
      SearchPageEffects,
      BookingPageEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'medbooker',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class StateModule {}
