import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            if (currentUser.roles.includes("ROLE_ADMIN") && state.url.includes("/dashboard/faculty")) {
                this.router.navigate(['/dashboard/admin']);
                return true;
            }

            if (currentUser.roles.includes("ROLE_FACULTY") && state.url.includes("/dashboard/admin")) {
                this.router.navigate(['/dashboard/faculty']);
                return true;
            }
        }

        return true;
    }
}
