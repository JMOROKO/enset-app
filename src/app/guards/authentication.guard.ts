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
export class AuthenticationGuard {
  constructor(
    private router: Router,
    private appState: AppStateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.appState.authState.isAuthenticated){
      return true;
    }
    this.router.navigateByUrl("/login");
    return false;
  }

}
