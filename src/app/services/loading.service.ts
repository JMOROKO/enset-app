import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // @TODO voici comment creer des observaqble
  public isLoading$ = new Subject<boolean>();
  constructor() { }

  showLoadingSpinner(): void {
    //permet de transmettre l'information true à n'importe quel composant qui va écouter ce service
    this.isLoading$.next(true);
  }

  hideLoadingSpinner(): void {
    this.isLoading$.next(false);
  }
}
