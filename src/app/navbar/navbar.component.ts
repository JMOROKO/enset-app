import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions: Array<any> = [
    {title: "Home", route: "/home", icon: "house"},
    {title: "Products", route: "/products", icon: "arrow-up"},
    {title: "New product", route: "/new-product", icon: "plus"},
  ];
  currentAction: any;
  //public isLoading: boolean = false;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  constructor(public appState: AppStateService, public loadingService: LoadingService) {
    // @TODO voici comment utiliser des observaqbles methode ts
    //voici comment du coté typeScript on souscrit à un observable
    /*this.loadingService.isLoading$.subscribe({
      next: value => {
        this.isLoading = value;
      }
    })*/
  }
}
