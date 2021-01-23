import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteGuardGuard implements CanActivate {

  constructor(
    private rotuer: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let id = next.params.id
    let voted = localStorage.getItem(id) == 'true'
    if (voted)
      this.rotuer.navigate(['r', id])

    return !voted;
  }

}
