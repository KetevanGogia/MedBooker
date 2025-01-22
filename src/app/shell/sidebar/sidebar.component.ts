import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserRoles } from 'src/app/models/members.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userRoles = UserRoles;
  user = this.authService.currentUser;
  constructor(private authService: AuthService) {}
}
