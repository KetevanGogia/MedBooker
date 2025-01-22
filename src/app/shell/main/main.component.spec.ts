import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbThemeModule, NbSidebarModule } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, HeaderComponent, SidebarComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        NbLayoutModule,
        NbThemeModule.forRoot(),
        NbSidebarModule.forRoot(),
        RouterModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
