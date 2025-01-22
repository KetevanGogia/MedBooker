import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BookingComponent } from './pages/booking/booking.component';
import { ConsultationRequestComponent } from './pages/consultation-request/consultation-request.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HealthRecordsComponent } from './pages/health-records/health-records.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { MainComponent } from './shell/main/main.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AnonymGuardGuard } from './guards/anonym-guard.guard';
import { RoleGuard } from './guards/role.guard';
import { AttendeeType, UserRoles } from './models/members.model';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AnonymGuardGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [RoleGuard],
        data: { role: UserRoles.Provider },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'upcoming-consultations',
        component: UpcomingConsultationsComponent,
      },
      {
        path: 'health-records',
        component: HealthRecordsComponent,
        canActivate: [RoleGuard],
        data: { role: UserRoles.Patient },
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [RoleGuard],
        data: { role: UserRoles.Patient },
      },
      {
        path: 'booking/:id',
        component: BookingComponent,
        canActivate: [RoleGuard],
        data: { role: UserRoles.Patient },
      },
      {
        path: 'request-consultation',
        component: ConsultationRequestComponent,
        canActivate: [RoleGuard],
        data: { role: UserRoles.Provider },
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
