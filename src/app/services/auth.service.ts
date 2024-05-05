import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appState: AppStateService) { }

  async login(username: string, password: string){
    let user:any = await firstValueFrom( this.http.get(`http://localhost:8089/users/${username}`) );

    if(atob(user.password) == password){
      let decodeJwt:any = jwtDecode(user.token);
      this.appState.setAuthState({
        username: decodeJwt.sub,
        roles: decodeJwt.roles,
        isAuthenticated: true,
        token: user.token
      });
      return Promise.resolve(true);
    }
    return Promise.reject("Bad credentials");
  }
}
