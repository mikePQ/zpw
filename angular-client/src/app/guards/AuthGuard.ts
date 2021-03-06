import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {

  }

  canActivate() {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
