import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions: Array<any> = [
    {title: "Home", route: "/home", icon: "house"},
    {title: "Products", route: "/products", icon: "arrow-up"},
    {title: "New product", route: "/new-product", icon: "plus"},
  ];
  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
