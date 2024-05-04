import { Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpClient,
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appState: AppStateService, private loadingService: LoadingService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*this.appState.setProductState({
      status: "LOADING"
    });*/
    this.loadingService.showLoadingSpinner();

    let reqclone = request.clone({
      headers: request.headers.set("Authorization", "Bearer JWT")
    });
    // pipe permet d'écouter la réponse
    return next.handle(reqclone).pipe(
      finalize(() => {
        /*this.appState.setProductState({
          status: "LOADED"
        });*/
        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
