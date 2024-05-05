import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppStateService} from "../services/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(
    private router: Router,
    private appState: AppStateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.appState.authState.roles.includes(route.data['requiredRoles'])){
      return true;
    }
    this.router.navigateByUrl("/admin/not-authorized");
    return false;
  }

}
