import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  protected authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;

  onEdit(): void {
    alert('Edit functionality will be implemented in next workshop');
  }
}
