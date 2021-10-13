import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {

      if(currentUser.role == "admin" && !state.url.includes("/dashboard/admin")) {
        this.router.navigate(['/dashboard/admin']);
        return true;
      }

      if(currentUser.role == "faculty" && !state.url.includes("/dashboard/faculty")) {
        this.router.navigate(['/dashboard/faculty']);
        return true;
      }

      // // logged in so return true
      // console.log(state);
      // console.log(currentUser)
      //
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
