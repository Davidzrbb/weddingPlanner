import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {AuthService} from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          // User is not authenticated, redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
