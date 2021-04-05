import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardPreventService {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(): boolean {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigateByUrl('/admin');
      return false;
    }
    return true;
  }
}
