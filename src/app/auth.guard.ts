import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PasswordManagerService } from './password-manager.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private passService: PasswordManagerService, private router: Router) {}

  canActivate() {
    if (this.passService.isLoggedInGuard) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
