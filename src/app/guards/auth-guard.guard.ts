import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PeticionesService } from '../services/peticiones.service';
import { map, switchMap, flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authService: PeticionesService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.authService.returnDBToken().pipe(flatMap((val) => {
      if (val) {
        return this.authService.validateToken({ apiToken: val })
      } else {

        this.router.navigate(['login'])
      }

    }), map(val => {
      console.log(val);
      if (val) {

        if (val['code'] != 1) {

          this.router.navigate(['login'])


          return false
        }

        return true
      }
    }
    ))


  }

}
