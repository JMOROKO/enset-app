import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions: Array<any> = [
    {title: "Home", route: "/admin/home", icon: "house"},
    {title: "Products", route: "/admin/products", icon: "arrow-up"},
    {title: "New product", route: "/admin/new-product", icon: "plus"},
  ];
  currentAction: any;
  //public isLoading: boolean = false;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  constructor(public appState: AppStateService, public loadingService: LoadingService, private router: Router) {
    // @TODO voici comment utiliser des observaqbles methode ts
    //voici comment du coté typeScript on souscrit à un observable
    /*this.loadingService.isLoading$.subscribe({
      next: value => {
        this.isLoading = value;
      }
    })*/
  }

  logout() {
    this.appState.authState = {};
    this.router.navigateByUrl("/login");
  }

  login() {
    this.router.navigateByUrl("/login");
  }
}
