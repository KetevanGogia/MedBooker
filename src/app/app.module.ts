import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbDatepickerModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './shell/header/header.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MainComponent } from './shell/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';
import { HealthRecordsComponent } from './pages/health-records/health-records.component';
import { BookingComponent } from './pages/booking/booking.component';
import { SearchComponent } from './pages/search/search.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { ConsultationRequestComponent } from './pages/consultation-request/consultation-request.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { IsoDatePipe } from './pipes/iso-date.pipe';
import { MapComponent } from './components/map/map.component';
import { BookingRequestCardComponent } from './components/booking-request-card/booking-request-card.component';
import { NamePipe } from './pipes/name.pipe';
import { BookEntityCardComponent } from './components/book-entity-card/book-entity-card.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { BookPatientCardComponent } from './components/book-patient-card/book-patient-card.component';
import { PatientBookingDetailsComponent } from './components/patient-booking-details/patient-booking-details.component';
import { StateModule } from './modules/store/state.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomepageComponent,
    MainComponent,
    DashboardComponent,
    UpcomingConsultationsComponent,
    HealthRecordsComponent,
    BookingComponent,
    SearchComponent,
    PatientsComponent,
    ConsultationRequestComponent,
    NotFoundComponent,
    IsoDatePipe,
    MapComponent,
    BookingRequestCardComponent,
    NamePipe,
    BookEntityCardComponent,
    AppointmentCardComponent,
    AppointmentDetailsComponent,
    BookPatientCardComponent,
    PatientBookingDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NbThemeModule.forRoot(),
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    NbMenuModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StateModule,
    HttpClientModule,
    HotToastModule.forRoot({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
